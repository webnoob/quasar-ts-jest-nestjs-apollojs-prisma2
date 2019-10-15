import { Vue, Component } from 'vue-property-decorator'
import Book from '../book.model'
import BookService from '../book.service'
import { InjectDependant } from 'src/boot/di'
import BookCrudDto from '../dto/BookCrudDto'

@Component
export default class BookComponent extends Vue {
  public showingAddBook: boolean = false
  public title: string = ''
  public books: Book[] = []

  @InjectDependant private readonly bookService!: BookService

  public showAddBook () {
    this.showingAddBook = !this.showingAddBook
  }

  public save (): Promise<Book> {
    const dto = new BookCrudDto()
    dto.title = this.title
    return this.bookService.create(dto).then((book: Book) => {
      this.$q.notify({
        message: 'Book created: ' + book.id
      })
      return book
    })
  }

  public cancel () { }

  public created () {
    this.bookService.get().then(books => {
      this.books = books
    })
  }
}
