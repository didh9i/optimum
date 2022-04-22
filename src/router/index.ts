import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    name: 'Servers',
    path: '/servers',
    component: () => import('@/views/Home.vue')
  },
  {
    name: 'Rules',
    path: '/rules',
    component: () => import('@/views/Home.vue')
  },
  {
    name: 'Market',
    path: '/market',
    component: () => import('@/views/Home.vue')
  },
  {
    name: 'Store',
    path: '/store',
    component: () => import('@/views/Home.vue')
  },
  {
    name: 'SignIn',
    path: '/sign-in',
    component: () => import('@/views/SignIn.vue')
  },
  {
    name: 'SignUp',
    path: '/sign-up',
    component: () => import('@/views/SignUp.vue')
  },
  {
    name: 'Servers',
    path: '/servers',
    component: () => import('@/views/Home.vue')
  },
  {
    name: 'Rules',
    path: '/rules',
    component: () => import('@/views/Home.vue')
  },
  {
    name: 'Market',
    path: '/market',
    component: () => import('@/views/Home.vue')
  },
  {
    name: 'Store',
    path: '/store',
    component: () => import('@/views/Home.vue')
  },
  {
    name: 'Profile',
    path: '/profile/:user',
    component: () => import('@/views/Home.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
