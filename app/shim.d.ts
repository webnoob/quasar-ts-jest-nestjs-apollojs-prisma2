import VueI18n from 'vue-i18n'

declare module 'vue/types/vue' {
  interface Vue {
    i18n: VueI18n;
  }
}

/*
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    dependencies: string[]
  }
}
 */
