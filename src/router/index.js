import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: MainLayout,
      meta: {
        requiresAuth: true,
        menu: true,
        footer: true,
        preview: false
      },
      children: [
        { path: '', name: 'pickLocation', component: () => import('@/views/Location.vue') },
        {
          path: 'builder',
          name: 'home',
          meta: { menu: false, footer: false, preview: true },
          component: () => import('@/views/Home.vue'),
          beforeEnter: (to, from, next) => {
            const appStore = useAppStore()
            const { selectedLocations } = storeToRefs(appStore)
            if (selectedLocations.value.length === 0) {
              next({ name: 'pickLocation' })
              return
            }
            next()
          }
        }
      ]
    }
  ]
})

export default router
