import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/login',
    meta: {
      requiresAuth: false,
      authLayer: true
    },
    component: () => import('src/areas/notLoggedIn/layouts/Default.vue'),
    children: [
      { path: '', component: () => import('src/areas/notLoggedIn/pages/Index.vue') }
    ]
  },
  {
    path: '/',
    meta: {
      requiresAuth: true
    },
    component: () => import('src/areas/loggedIn/layouts/Default.vue'),
    children: [
      { path: '', component: () => import('src/areas/loggedIn/pages/Index.vue') }
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
