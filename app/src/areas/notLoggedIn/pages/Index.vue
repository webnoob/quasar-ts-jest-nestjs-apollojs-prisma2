<template>
  <q-page class="flex flex-center">
    <div class="col-xs-6">
      <h5>You must log in</h5>
      <q-input v-model="username" label="Username" />
      <q-input v-model="password" label="password" type="password" />

      <q-btn @click="login" label="Login" class="full-width q-mt-md" color="primary" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AuthService, { AuthServiceError } from 'src/modules/_base/auth/auth.service'
import { injectSingleton } from '../../../modules/diContainer'

@Component
export default class IndexComponent extends Vue {
  public username: string = 'webnoob'
  public password: string = 'changeme'

  @injectSingleton(AuthService)
  private readonly authService!: AuthService

  public login () {
    this.authService.login(this.username, this.password).then(() => {
      this.$router.push('/')
    }).catch((e: AuthServiceError) => {
      this.showError('There was an error logging in: ', e.message)
    })
  }
}
</script>
