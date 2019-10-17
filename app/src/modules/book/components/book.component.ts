import { Vue, Component } from 'vue-property-decorator'
import { inject } from 'inversify-props'

import Book from '../book.model'
import BookCrudDto from '../dto/bookCrud.dto'
import IBookService from '../book.service.interface'

@Component
export default class BookComponent extends Vue {
  public showingAddBook: boolean = false
  public title: string = ''
  public books: Book[] = []

  @inject()
  private bookService!: IBookService<BookCrudDto, Book>

  public showAddBook () {
    this.showingAddBook = !this.showingAddBook
  }

  public saveBook (): Promise<Book> {
    const dto = new BookCrudDto()
    dto.title = this.title
    return this.bookService.create(dto).then((book: Book) => {
      return book
    })
  }

  public save (): void {
    this.saveBook().then(book => {
      this.$q.notify({
        message: 'Book created: ' + book.id
      })
    })
  }

  public cancel () { }

  public created () {
    this.bookService.get().then(books => {
      this.books = books
    })
  }
}
