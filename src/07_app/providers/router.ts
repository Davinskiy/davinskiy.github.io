import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from '@/05_pages'

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  next()
  
  document.title = `${to.meta.title || ''} - [FrontEnd Developer]`
})
