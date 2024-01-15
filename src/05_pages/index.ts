import RouterView from './index.vue'

export const routes = [
  {
    path: '/',
    redirect: '/portfolios'
  },
  {
    path: '/portfolios',
    name: 'Portfolios',
    meta: { title: 'Портфолио' },
    component: () => import('./portfolios')
  },
  {
    path: '/contacts',
    name: 'Contacts',
    meta: { title: 'Контакты' },
    component: () => import('./contacts')
  },
  { path: '/:pathMatch(.*)*', meta: { title: '404' }, component: () => import('./error404') }
]

export { RouterView }
