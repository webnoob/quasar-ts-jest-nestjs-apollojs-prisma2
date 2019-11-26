<template>
  <q-page class="flex flex-center">
    <div class="col-xs-6">
      <p>This page is accessible by any group, logged in or not.</p>
      <ul>
        <li>Name: {{authenticatedUser ? authenticatedUser.username : ''}}</li>
        <li>Role: {{authenticatedUserRoleName}}</li>
        <li>Inherited Roles: {{authenticatedUserRoleNames}}</li>
        <li>Permissions: {{authenticatedUserRolePermissions}}</li>
        <li>Can Act As: {{canActAs}}</li>
        <li>Has Acting As: {{hasActingAs}}</li>
      </ul>
      <p>You are:  with a role of </p>
      <p></p>

      <q-btn label="Login" to="login" color="primary" />
      <q-btn label="Logout" @click="logout" v-if="isAuthenticated" color="primary" class="on-right" />
    </div>

    <q-list class="col-cd-7">
      <q-item-label header>Navigation</q-item-label>
      <q-item to="/dashboard" clickable>
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Dashboard</q-item-label>
          <q-item-label caption>Logged in area</q-item-label>
        </q-item-section>
      </q-item>
      <q-item to="/page2" clickable>
        <q-item-section avatar>
          <q-icon name="bank" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Another page</q-item-label>
          <q-item-label caption>Not logged in area</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { getAppRoleNames, getAppRolePermissionNames } from 'saas-common/dist/app.roles'

import { AUTH_LOGOUT_REQUEST } from '../../../store/actions/auth'
import BaseMixin from '../../../components/mixins/base'

@Component
export default class IndexComponent extends BaseMixin {
  get authenticatedUserRolePermissions () {
    return ''.concat(getAppRolePermissionNames(this.authenticatedUser.role), ',', getAppRolePermissionNames(this.mimicUser.role))
  }

  get authenticatedUserRoleNames () {
    return getAppRoleNames(this.authenticatedUser.role | this.mimicUser.role)
  }

  get authenticatedUserRoleName () {
    return this.authenticatedUser.role
  }

  get canActAs () {
    return this.authenticatedUser.canActAs
  }

  get hasActingAs () {
    return this.authenticatedUser.hasActingAs
  }

  public logout () {
    this.$store.dispatch(AUTH_LOGOUT_REQUEST)
  }
}
</script>
