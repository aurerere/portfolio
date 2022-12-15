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
      path: '/formal',
      name: 'formal',
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
