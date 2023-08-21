import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/save',
      name: 'save',
      component: () => import('../views/SaveExamView.vue')
    },
    {
      path: '/manage-permissions',
      name: 'permission-manager',
      component: () => import('../views/PermissionManagerView.vue')
    },
    {
      path: '/list-exams',
      name: 'exams-list',
      component: () => import('../views/ExamsListView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/teste',
      name: 'teste',
      component: () => import('../views/ImageView.vue')
    },
    {
      path: '/encryption',
      name: 'encryption',
      component: () => import('../views/EncryptionView.vue')
    },
    {
      path: '/notification',
      name: 'notification',
      component: () => import('../views/Notification.vue')
    }
  ]
})

export default router
