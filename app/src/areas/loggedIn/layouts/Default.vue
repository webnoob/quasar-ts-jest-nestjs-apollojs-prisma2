<template>
  <q-layout view="lHh Lpr lFf" :key="mimicUser.id">
    <q-page-container>
      <h6 class="q-pa-none q-ma-none">[{{authenticatedUser.username}} acting as: [{{mimicUser.username}}]] Logged in website container</h6>
      <select-user-to-mimic />
      <router-view />
    </q-page-container>

    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
        <q-btn
          @click="logout"
          label="Logout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigation</q-item-label>
        <q-item to="/dashboard" clickable>
          <q-item-section avatar>
            <q-icon name="bank" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
            <q-item-label caption>Logged in area</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/" clickable>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
            <q-item-label caption>Not logged in area</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/dashboard/g2" v-can="appRole.Reviewer" clickable>
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Group 2 Up</q-item-label>
            <q-item-label caption>Logged in area</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/dashboard/g3" v-can="appRole.Author" clickable>
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Group 3 Up</q-item-label>
            <q-item-label caption>Logged in area</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/dashboard/g6" v-can="appRole.VirtualAssistant" clickable>
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Group 6 Up</q-item-label>
            <q-item-label caption>Logged in area</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/dashboard/g7" v-can="appRole.Admin" clickable>
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Group 7 Up</q-item-label>
            <q-item-label caption>Logged in area</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  </q-layout>
</template>

<script lang="ts">
import {AUTH_LOGOUT_REQUEST} from '../../../store/actions/auth'
import SelectUserToMimic from '../../../components/SelectUserToMimic.vue'
import BaseMixin from '../../../components/mixins/base'
import { Component } from 'vue-property-decorator'

@Component({
  components: {
    SelectUserToMimic
  }
})
export default class MyLayout extends BaseMixin {
  leftDrawerOpen: boolean = false

  logout () {
    this.$store.dispatch(AUTH_LOGOUT_REQUEST).then(() => {
      this.$router.push('login')
    })
  }
}
</script>
