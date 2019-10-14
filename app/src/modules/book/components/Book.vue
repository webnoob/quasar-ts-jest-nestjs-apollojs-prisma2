<template>
  <div>
    <h1>Adding a book!</h1>
    <q-list>
      <q-item
        v-for="book in books"
        :key="book.id"
      >
        {{book}}
      </q-item>
    </q-list>
    <q-btn @click="showAddBook" label="Click to add a book" />

    <q-dialog
      v-model="showingAddBook"
    >
      <q-card>
        <q-card-section>
          <q-input v-model="title" label="Title" />
        </q-card-section>
        <q-card-section>
          <q-btn @click="save" label="Save" />
          <q-btn @click="cancel" label="Cancel" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Book from '../book.model'
import BookService from '../book.service'
import { InjectDependant } from '../../../boot/di'
import BookCrudDto from '../dto/BookCrudDto'

@Component
export default class BookComponent extends Vue {
  private showingAddBook: boolean = false
  private title: string = ''
  private books: Book[] = []

  @InjectDependant private readonly bookService!: BookService

  showAddBook () {
    this.showingAddBook = !this.showingAddBook
  }

  save () {
    const dto = new BookCrudDto()
    dto.title = this.title
    this.bookService.create(dto).then((book: Book) => {
      this.$q.notify({
        message: 'Book created: ' + book.id
      })
    })
  }

  cancel () { }

  public created () {
    this.bookService.get().then(books => {
      this.books = books
    })
  }
}
</script>
