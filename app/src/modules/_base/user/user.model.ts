import BaseModel from '../base.model'
import { AppRoles } from 'saas-common/dist/app.roles'

export default class User extends BaseModel {
  public username: string = ''
  public emailAddress: string = ''
  public role!: AppRoles
  public canActAs!: string[]
  public hasActingAs!: string[]
}
