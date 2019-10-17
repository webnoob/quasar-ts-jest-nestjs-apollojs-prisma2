import BaseModel from '../_base/base.model'

export default class Book extends BaseModel {
  public title: string = ''
  public description!: string
}
