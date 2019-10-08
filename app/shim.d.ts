import VueI18n from "vue-i18n";
import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    i18n: VueI18n;
  }
}