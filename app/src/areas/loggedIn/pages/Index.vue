<template>
  <q-page class="flex flex-center">
    <book></book>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Book from 'src/modules/book/components/book.component.vue'

@Component({
  components: {
    Book
  }
})
export default class IndexComponent extends Vue { }
</script>
