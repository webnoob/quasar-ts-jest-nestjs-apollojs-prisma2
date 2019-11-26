<template>
  <div>
    <h6>Adding a book!</h6>

    <div class="col-xs-12 q-mb-md">
      <q-btn @click="showAddBook" label="Click to add a book" />
      <q-btn @click="loadBooks" label="LOAD BOOKS" />
    </div>

    <q-list bordered separator>
      <q-item
        v-for="book in books"
        :key="book.id"
      >
        <q-item-section>
          <q-item-label>{{book.title}}</q-item-label>
          <q-item-label caption>ID: {{book.id}}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-btn icon="delete" flat @click="deleteBook(book.id)" />
        </q-item-section>
      </q-item>
    </q-list>

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

<script lang="ts" src="./book.component.ts" />

