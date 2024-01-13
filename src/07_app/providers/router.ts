import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/05_pages'

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  next()
  
  const title = to.meta.title ? `- ${to.meta.title}` : ''
  document.title = `[SiteTitle] ${title}`
})
