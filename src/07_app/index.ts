import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from "primevue/config"
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import App from './index.vue'

import { router } from './providers'

import '@/01_shared/assets/styles/reset.scss'
import '@/01_shared/assets/styles/main.scss'
import 'primevue/resources/themes/lara-light-green/theme.css'

export const app = createApp(App)
  .use(PrimeVue)
  .use(createPinia())
  .use(router)

