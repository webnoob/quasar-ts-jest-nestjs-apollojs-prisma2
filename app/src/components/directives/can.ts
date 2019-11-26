import { DirectiveFunction, DirectiveOptions } from 'vue'
import { canAccessByRole, canAccessByPermission } from 'booksprout/dist/app.roles'
import { BootFileParams } from 'quasar'

const getDirective = ({ store }: BootFileParams): DirectiveOptions | DirectiveFunction => {
  const directive: DirectiveOptions | DirectiveFunction = {
    // Run this directive when the element is inserted into the parent element in the DOM.
    // Failure to do this would mean the element would show until next render update.
    inserted: (el, binding, vnode) => {
      const
        authenticatedUser = store.getters.authenticatedUser,
        mimicUser = store.getters.mimicUser,
        // If we're checking a perm or a role
        userHasPermission = binding.arg === 'perm'
          ? canAccessByPermission(authenticatedUser, mimicUser, binding.value)
          : canAccessByRole(authenticatedUser, mimicUser, binding.value)

      if (!userHasPermission) {
        // Doesn't have permission to access this item so remove the element from the dom
        if (vnode && vnode.elm && vnode.elm.parentElement) {
          vnode.elm.parentElement.removeChild(vnode.elm)
        }
      }
    }
  }

  return directive
}

export default getDirective
