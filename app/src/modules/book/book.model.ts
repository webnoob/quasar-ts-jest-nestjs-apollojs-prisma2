import BaseModel from '../base/base.model'

export default class Book extends BaseModel {
  title!: string
  description!: string
}
