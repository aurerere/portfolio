import { createRouter, createWebHistory } from 'vue-router'
import FormalView from "@/views/FormalView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'FormalView',
      component: FormalView
    },
    {
      path: '/cli',
      name: 'CLIView',
      component: () => import('../views/CLIView.vue')
    },
    {
      path: "/:pathMatch(.*)*",
      name: 'NotFoundView',
      component: () => import('../views/NotFoundView.vue')
    },
  ]
})

export default router;
