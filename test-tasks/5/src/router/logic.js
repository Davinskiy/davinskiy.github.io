import store from '@/store'

export function onAuth(to, from, next) {
  if (store.getters.isAuthenticated) {
    next({ name: 'home' })
  } else if(to.name !== 'auth') {
    next({ name: 'auth' })
  } else {
    next()
  }
}

export function onInnerPage(to, from, next) {
  if (store.getters.isAuthenticated) {
    next()
  } else {
    next({ name: 'auth' })
  }
}
