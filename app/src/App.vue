<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import { buildDependencyContainer } from './di/container'
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AppComponent extends Vue {
  created () {
    console.log('beforeCreated!!')
    buildDependencyContainer()
  }
}
</script>
