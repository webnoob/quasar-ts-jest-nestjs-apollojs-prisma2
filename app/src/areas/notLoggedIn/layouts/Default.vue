<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <h6 class="q-pa-none q-ma-none">Not logged in website container</h6>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  }
})
</script>
