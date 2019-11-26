import { BootFileParams } from 'quasar'
import getDirective from 'src/components/directives/can'

export default async ({ Vue, store, router, app, ssrContext }: BootFileParams) => {
  const directiveParams = { Vue, store, router, app, ssrContext }
  Vue.directive('can', getDirective(directiveParams))
}
