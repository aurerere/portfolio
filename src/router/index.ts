import { createRouter, createWebHistory } from 'vue-router'
import CLIView from '../views/CLIView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'CLIView',
      component: CLIView
    },
    {
      path: '/formal',
      name: 'FormalView',
      component: () => import('../views/FormalView.vue')
    },
    {
      path: "/:pathMatch(.*)*",
      name: 'NotFoundView',
      component: () => import('../views/NotFoundView.vue')
    },
  ]
})

export default router;
