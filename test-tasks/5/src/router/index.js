import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import {
  onAuth,
  onInnerPage,
} from './logic'

export default new VueRouter({
  routes : [
    {
      path : '/',
      name: 'home',
      redirect: 'analytics',
    },
    {
      path : '/auth',
      name: 'auth',
      component: () => import('@/views/Auth'),
      beforeEnter: onAuth,
    },
    {
      path : '/analytics',
      name: 'analytics',
      component: () => import('@/views/Analytics'),
      beforeEnter: onInnerPage,
    },
    {
      path : '/logout',
      name: 'logout',
      component: () => import('@/views/Logout'),
    },
    // {
    //   path : '*',
    //   name: '404',
    //   redirect: 'home',
    // },
  ],
  // mode : 'history'
});