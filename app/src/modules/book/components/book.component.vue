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

<script lang="ts" src="./book.component.ts" />

