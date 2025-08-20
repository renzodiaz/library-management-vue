import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from '@/api/auth'

// Import layout
import AuthLayout from '@/views/layouts/AuthLayout.vue'
import DashboardLayout from '@/views/layouts/DashboardLayout.vue'

// Pages
import BooksPage from '@/views/pages/books/BooksPage.vue'
import DashboardPage from '@/views/pages/dashboard/DashboardPage.vue'
import LoginPage from '@/views/pages/auth/LoginPage.vue'
import RegisterPage from '@/views/pages/auth/RegisterPage.vue'

const reqAuth = { requiresAuth: true }

const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginPage
      },
      {
        path: 'register',
        name: 'Register',
        component: RegisterPage,
      },
    ],
  },
  {
    path: '/',
    component: DashboardLayout,
    meta: {...reqAuth},
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardPage,
      },
      {
        path: 'books',
        name: 'Books',
        component: BooksPage,
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

router.beforeEach((to, from, next) => {
  console.log(`router entering page: ${to.path}`)

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const currentUser = getCurrentUser()

  // 1. If trying to access protected route but not logged in
  if (requiresAuth && !currentUser) {
    console.log('Wanting to go to (but not signed in): ', to)

    if (to.path === '/dashboard') {
      next('/auth/login')
    } else {
      next(`/auth/login?final=${to.path}`)
    }
    return
  }

  // 2. If logged in and trying to go to login/register → redirect to dashboard
  const isAuthPage = to.path.startsWith('/auth')
  if (currentUser && isAuthPage) {
    next('/dashboard')
    return
  }

  // 3. Otherwise just continue
  next()
})

export default router
