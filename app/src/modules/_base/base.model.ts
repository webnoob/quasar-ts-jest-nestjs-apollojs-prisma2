import { IBaseModel } from './base.model.interface'

export default class BaseModel implements IBaseModel {
  public id!: string
  public createdDate!: Date
}
