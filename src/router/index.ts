import { createRouter, createWebHistory } from 'vue-router'
import ShellContainerView from '../views/ShellContainerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ShellContainerView
    },
    {
      path: '/formal.json',
      name: 'formal.json',
      component: () => import('../views/FormalViewSoon.vue')
    },
    {
      path: '/formal-dev',
      name: 'formal-dev',
      component: () => import('../views/FormalView.vue')
    },
    {
      path: "/:pathMatch(.*)*",
      name: '404',
      component: () => import('../views/NotFoundScreen.vue')
    },
  ]
})

export default router;
