import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Homeview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    }
  ],
})

export default router
