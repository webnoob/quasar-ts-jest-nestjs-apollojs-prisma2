<template>
  <q-page class="flex flex-center">
    <book></book>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import Book from 'src/modules/book/components/Book.vue'

export default Vue.extend({
  name: 'PageIndex',

  components: {
    Book
  }
})
</script>
