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
    <q-btn @click="getBooks" label="Get Books" />
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
import Vue from 'vue'
import BookCrudDto from '../dto/book.crud.dto'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'Book',

  data () {
    return {
      showingAddBook: false,
      title: ''
    }
  },

  computed: {
    ...mapGetters({
      books: 'book/get'
    })
  },

  methods: {
    showAddBook () {
      this.showingAddBook = !this.showingAddBook
    },
    save () {
      const dto: BookCrudDto = {
        description: '',
        title: this.title
      }

      this.$store.dispatch('book/create', dto)
    },
    cancel () {

    },
    getBooks () {
      this.$store.dispatch('book/get').then(books => {
        console.log('Got some books!')
        console.log(books)
      })
    }
  }
})
</script>
