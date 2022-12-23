import { createRouter, createWebHistory } from 'vue-router'
import ShellContainerView from '../views/ShellView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ShellContainerView
    },
    {
      path: '/formal',
      name: 'formal-dev',
      component: () => import('../views/FormalView.vue')
    },
    {
      path: "/:pathMatch(.*)*",
      name: '404',
      component: () => import('../views/NotFoundView.vue')
    },
  ]
})

export default router;
