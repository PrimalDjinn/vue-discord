import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/views/auth/AuthLayout.vue'
import MainLayout from '@/views/main/MainLayout.vue'
import ServerLayout from '@/views/main/servers/ServerLayout.vue'
import Error404 from '@/views/error/Error404.vue'

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
      path: '/setup',
      name: 'Setup',
      meta: { title: '設定' },
      component: () => import('@/views/setup/SetupView.vue')
    },
    {
      path: '/invite/:inviteCode',
      name: 'Invite',
      meta: { title: '邀請碼' },
      component: () => import('@/views/invite/ServerInviteView.vue')
    },
    {
      path: '/',
      redirect: { path: '/setup' },
      component: MainLayout,
      children: [
        {
          path: 'server/:serverId',
          component: ServerLayout,
          children: [
            {
              path: '',
              name: 'Server',
              meta: { title: 'Server' },
              component: () => import('@/views/main/servers/ChannelView.vue')
            },
            {
              path: 'channel/:channelId',
              name: 'Channel',
              meta: { title: 'Channel' },
              component: () => import('@/views/main/servers/ChannelView.vue')
            },
            {
              path: 'conversation/:memberId',
              name: 'Conversation',
              meta: { title: 'Conversation' },
              component: () => import('@/views/main/servers/ConversationView.vue')
            }
          ]
        }
      ]
    },

    { path: '/:pathMatch(.*)*', component: Error404 }
  ]
})

export default router
