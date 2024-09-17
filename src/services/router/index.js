import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/DashboardPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/create-account',
      name: 'create-account',
      component: () => import('@/views/AccountCreation.vue'),
      children: [
        {
          path: 'upload-national-card',
          name: 'upload-national-card'
        },
        {
          path: 'confirm-information',
          name: 'confirm-information'
        }
      ]
    }
  ]
})

export default router
