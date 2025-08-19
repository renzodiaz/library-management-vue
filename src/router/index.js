import { createRouter, createWebHistory } from 'vue-router'

// Import layout + page
import AuthLayout from '../views/layouts/AuthLayout.vue'
import LoginPage from '../views/pages/auth/LoginPage.vue'

const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login', // full path = /auth/login
        name: 'Login',
        component: LoginPage,
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
