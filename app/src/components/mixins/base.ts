import { Vue, Component } from 'vue-property-decorator'
import { AppRolePermissions, AppRole } from 'booksprout/dist/app.roles'
import { Getter } from 'vuex-class'
import User from '../../modules/_base/user/user.model'

@Component
export default class BaseMixin extends Vue {
  @Getter('authenticatedUser') private _authenticatedUser!: User
  @Getter('mimicUser') private _mimicUser!: User

  @Getter('isAuthenticated') protected isAuthenticated!: boolean

  protected get authenticatedUser () {
    return this._authenticatedUser
      ? this._authenticatedUser
      : new User()
  }

  protected get mimicUser () {
    return this._mimicUser
      ? this._mimicUser
      : new User()
  }

  protected appRolePermissions = AppRolePermissions
  protected appRole = AppRole

  public showMessage (message: string, ...optionalParams: any[]): void {
    this.$q.notify({
      message: message.concat(optionalParams.join(' ')),
      color: 'green-5',
      position: 'top'
    })
  }

  public showError (message: string, ...optionalParams: any[]) {
    this.$q.notify({
      message: message.concat(optionalParams.join(' ')),
      color: 'red-9',
      position: 'top'
    })
  }
}
