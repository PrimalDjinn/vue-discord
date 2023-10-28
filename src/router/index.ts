import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/views/auth/AuthLayout.vue'
import MainLayout from '@/views/main/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          path: 'login',
          name: 'Login',
          meta: { title: '登入' },
          component: () => import('@/views/auth/LoginView.vue')
        },
        {
          path: 'register',
          name: 'Register',
          meta: { title: '註冊' },
          component: () => import('@/views/auth/RegisterView.vue')
        }
      ]
    },
    // 守護路由
    {
      path: '/',
      redirect: { path: '/home' },
      component: MainLayout,
      children: [
        {
          path: 'home',
          name: 'Home',
          meta: { title: '首頁' },
          component: () => import('@/views/main/HomeView.vue')
        },
        {
          path: 'about',
          name: 'About',
          meta: { title: 'About' },
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/main/AboutView.vue')
        }
      ]
    }
  ]
})

export default router
