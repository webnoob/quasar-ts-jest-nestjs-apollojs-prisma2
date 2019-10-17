import BaseModel from '../base.model'

export default class User extends BaseModel {
  public username: string = ''
  public emailAddress: string = ''
  public accessToken: string = ''
}
