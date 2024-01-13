import RouterView from './index.vue'

export const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { title: 'Главная' },
    component: () => import('./home')
  },
  {
    path: '/portfolios',
    name: 'Portfolios',
    meta: { title: 'Портфолио' },
    component: () => import('./portfolios')
  },
  { path: '/:pathMatch(.*)*', component: () => import('./error404') }
]

export { RouterView }
