import IBookCrudDto from './bookCrud.dto.interface'

export default class BookCrudDto implements IBookCrudDto {
  public id?: string
  public title: string = ''
  public description?: string
}
