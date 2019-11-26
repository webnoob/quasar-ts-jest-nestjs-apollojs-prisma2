<template>
  <q-page class="flex flex-center">
    <div class="col-xs-6">
      <p>Can be accessed by groups</p>
      <can-be-access-by :groups="[2,3,4,5,6,7]" />
    </div>

    <q-list class="col-cd-7">
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
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import CanBeAccessBy from '../../../components/CanBeAccessBy.vue'

@Component({
  components: {CanBeAccessBy}
})
export default class IndexComponent extends Vue {
}
</script>
