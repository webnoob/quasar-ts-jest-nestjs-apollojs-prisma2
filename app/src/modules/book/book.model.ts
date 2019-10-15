import BaseModel from '../_base/base.model'

export default class Book extends BaseModel {
  public id: string = ''
  public title: string = ''
  public description!: string
}
