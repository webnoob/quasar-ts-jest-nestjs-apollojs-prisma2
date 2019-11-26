<template>
  <div>
    <div v-can:perm="appRolePermissions.CanMimicUsers">
      <q-btn v-if="mimicUser.id" @click="clearMimic" label="Clear Mimic" />

      <q-select
        v-else
        v-model="selectedUser"
        option-label="username"
        input-debounce="500"
        label="Select a user to mimic"
        :options="options"
        @filter="filterFn"
        @input="selectUser"
        filled
        use-input
        hide-selected
        fill-input
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
</template>


<script lang="ts">
import { inject } from 'inversify-props'
import { Component } from 'vue-property-decorator'

import UserServiceInterface from '../modules/_base/user/user.service.interface'
import UserCrudDto from '../modules/_base/user/dto/userCrud.dto'
import User from '../modules/_base/user/user.model'
import BaseMixin from './mixins/base'
import { SET_MIMIC_USER } from '../store/actions/auth'

@Component
export default class SelectUserToMimic extends BaseMixin {
  @inject()
  private readonly userService!: UserServiceInterface<UserCrudDto, User>

  protected selectedUser: User | null = null
  protected options: User[] = []

  public filterFn (val: string, update: (done: () => void) => void) {
    if (val) {
      this.userService.getUsersToMimic(val).then((users: User[]) => {
        update(() => {
          this.options = users
        })
      })
    }
  }

  public selectUser () {
    this.$store.dispatch(SET_MIMIC_USER, this.selectedUser)
  }

  public clearMimic () {
    this.$store.dispatch(SET_MIMIC_USER, null)
  }
}
</script>
