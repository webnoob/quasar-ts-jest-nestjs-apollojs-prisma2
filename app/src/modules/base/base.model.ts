import { IBaseModel } from './IBaseModel'

export default class BaseModel implements IBaseModel {
  public id!: string
  public createdDate!: Date
}
