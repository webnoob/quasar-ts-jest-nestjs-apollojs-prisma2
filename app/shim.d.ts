import VueI18n from 'vue-i18n'
import ApolloClient from 'apollo-client'

declare module "vue/types/vue" {
  interface Vue {
    i18n: VueI18n;
  }
}

declare global {
  interface Window {
    apolloClient: () => ApolloClient<any>;
  }
}
