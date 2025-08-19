import { createRouter, createWebHistory } from 'vue-router'

// Import layout + page
import AuthLayout from '../views/layouts/AuthLayout.vue'
import DashboardLayout from '@/views/layouts/DashboardLayout.vue'
import DashboardPage from '@/views/pages/dashboard/DashboardPage.vue'
import LoginPage from '../views/pages/auth/LoginPage.vue'

const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginPage,
      },
    ],
  },
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardPage,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*', // fallback
    redirect: '/auth/login',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
