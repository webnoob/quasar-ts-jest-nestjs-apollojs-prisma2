<template>
  <q-page class="flex flex-center">
    <div class="col-xs-6">
      <h5>You must log in</h5>
      <q-input v-model="username" label="Username" />
      <q-input v-model="password" label="password" type="password" />

      <q-btn @click="login" label="Login" class="full-width q-mt-md" color="primary" />

      <q-btn to="/" label="Return to Home Screen" class="full-width q-mt-md" color="secondary" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'

import { AUTH_REQUEST } from 'src/store/actions/auth'
import { AuthServiceError } from 'src/modules/_base/auth/auth.service.interface'
import BaseMixin from '../../../components/mixins/base'

@Component
export default class IndexComponent extends BaseMixin {
  public username: string = 'webnoob'
  public password: string = 'changeme'

  public login () {
    return this.$store.dispatch(AUTH_REQUEST, {
      username: this.username,
      password: this.password
    }).then(() => {
      this.$router.push('/dashboard')
    }).catch((e: AuthServiceError) => {
      this.showError('There was an error logging in: ', e.message)
    })
  }
}
</script>
