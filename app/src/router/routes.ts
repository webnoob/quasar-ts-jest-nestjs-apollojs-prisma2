import { RouteConfig } from 'vue-router'
import { AppRoles } from 'saas-common/dist/app.roles'

const routes: RouteConfig[] = [
  {
    path: '',
    meta: {
      requiresAuth: false,
      authLayer: true
    },
    component: () => import('src/areas/notLoggedIn/layouts/Default.vue'),
    children: [
      { path: '', component: () => import('src/areas/notLoggedIn/pages/Index.vue') },
      { path: 'login', component: () => import('src/areas/notLoggedIn/pages/Login.vue') },
      { path: 'page2', component: () => import('src/areas/notLoggedIn/pages/Page2.vue') }
    ]
  },
  {
    path: '/dashboard',
    meta: {
      requiresAuth: true,
      roles: AppRoles.Reviewer
    },
    component: () => import('src/areas/loggedIn/layouts/Default.vue'),
    children: [
      { path: '', component: () => import('src/areas/loggedIn/pages/Index.vue') },
      {
        path: 'g2',
        component: () => import('src/areas/loggedIn/pages/Group2Up.vue'),
        meta: {
          roles: AppRoles.Reviewer
        }
      },
      {
        path: 'g3',
        component: () => import('src/areas/loggedIn/pages/Group3Up.vue'),
        meta: {
          roles: AppRoles.Author
        }
      },
      {
        path: 'g6',
        component: () => import('src/areas/loggedIn/pages/Group6Up.vue'),
        meta: {
          roles: AppRoles.VirtualAssistant
        }
      },
      {
        path: 'g7',
        component: () => import('src/areas/loggedIn/pages/Group7Up.vue'),
        meta: {
          roles: AppRoles.Admin
        }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
