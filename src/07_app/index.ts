import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from "primevue/config"

import App from './index.vue'

import { router } from './providers'

import moment from 'moment'
import 'moment/dist/locale/ru'
moment.locale('ru')

import '@/01_shared/assets/styles/reset.scss'
import '@/01_shared/assets/styles/main.scss'
import 'primevue/resources/themes/lara-light-green/theme.css'

export const app = createApp(App)
  .use(PrimeVue)
  .use(createPinia())
  .use(router)

