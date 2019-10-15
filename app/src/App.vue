<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import { buildDependencyContainer } from './modules/diContainer'
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AppComponent extends Vue {
  created () {
    buildDependencyContainer()
  }
}
</script>
