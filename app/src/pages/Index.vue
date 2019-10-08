<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">

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
