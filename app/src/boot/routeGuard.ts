import { BootFileParams } from 'quasar'
import { AUTH_INVALID, AUTH_LOAD, AUTH_REQUIRED } from '../store/actions/auth'
import { canAccessByRole } from 'saas-common/dist/app.roles'

export default ({ app, router, store, ssrContext }: BootFileParams) => {
  store.dispatch(AUTH_LOAD)

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // If we require auth for this route (or any in the chain to get here). Redirect.
      if (store.getters.isAuthenticated !== true) {
        return store.dispatch(AUTH_REQUIRED)
      }

      const
        authenticatedUser = store.getters.authenticatedUser,
        mimicUser = store.getters.mimicUser

      // Go through the route hierarchy. Check if the parent has roles but child doesn't then assume child is also
      // restricted unless child has specific roles (this then overrides the parent) but the user must also have perms
      // for all the previous routes as well. Children can only extend permissions
      let hasPermission = true
      for (const currentRoute of to.matched) {
        // If the current route doens't have any roles, defer to it's parents hasPermission value.
        if (currentRoute.meta.roles === void 0) {
          continue
        }

        hasPermission = hasPermission && canAccessByRole(authenticatedUser, mimicUser, currentRoute.meta.roles)
      }

      if (hasPermission) {
        next() // All good, let can pass
      } else {
        // None shall pass!
        // Access Control failed - return them to the previous route.
        store.dispatch(AUTH_INVALID)
        router.push(from)
      }
    } else {
      next() // Page doesn't require auth, let them in.
    }
  })
}
