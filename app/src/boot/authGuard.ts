import { BootFileParams } from 'quasar'
import { buildDependencyContainer } from '../modules/diContainer'
import AuthService from '../modules/_base/auth/auth.service'

const container = buildDependencyContainer()
const authService = container.get(AuthService)

export default ({ app, router, store }: BootFileParams) => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !authService.isAuthenticated) {
      next('/login')
    } else {
      next()
    }
  })
}
