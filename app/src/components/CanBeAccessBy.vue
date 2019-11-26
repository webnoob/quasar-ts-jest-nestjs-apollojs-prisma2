<template>
  <ul>
    <li v-if="can(1)">[1] Not Logged In / General Browser</li>
    <li v-if="can(2)">[2] Logged In / Reviewer</li>
    <li v-if="can(3)">[3] Author</li>
    <li v-if="can(4)">[4] Publisher</li>
    <li v-if="can(5)">[5] ARC Services</li>
    <li v-if="can(6)">[6] Virtual Assistant</li>
    <li v-if="can(7)">[7] Admin</li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

const AppProps = Vue.extend({
  props: {
    groups: Array
  }
})

@Component
export default class IndexComponent extends AppProps {
  public can (s: number) {
    return this.groups.indexOf(s) > -1
  }
}
</script>
