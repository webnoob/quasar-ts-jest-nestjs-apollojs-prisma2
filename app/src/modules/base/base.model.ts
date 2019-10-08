interface IBaseModel {
  id: number
  createdDate: Date
}

export default class BaseModel implements IBaseModel {
  public id!: number
  public createdDate!: Date
}