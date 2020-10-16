<template>
  <v-app id="inspire">
    <main-header :menu="getMenu" />

    <drawer :menu="getMenu" />

    <v-main>
      <router-view />
    </v-main>

    <main-footer />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import MainHeader from '@/components/header'
import Drawer from '@/components/drawer'
import MainFooter from '@/components/footer'
export default {
  name: "App",
  components: {
    MainHeader,
    Drawer,
    MainFooter,
  },
  data(){
    return {
      menu : [
        {
          'url'   : '/auth',
          'icon'  : 'mdi-login',
          'title' : 'Авторизация',
          'rule': 'not-authed'
        },
        {
          'url'   : '/analytics',
          'icon'  : 'mdi-google-analytics',
          'title' : 'Аналитика',
          'rule': 'authed'
        },
        {
          'url'   : '/logout',
          'icon'  : 'mdi-logout',
          'title' : 'Выйти',
          'rule': 'authed'
        },
      ],
    }
  },
  computed: {
    ...mapGetters([
      'isAuthenticated'
    ]),

    getMenu(){
      if (this.isAuthenticated)
        return this.menu.filter(item => item.rule === 'authed')
      return this.menu.filter(item => item.rule === 'not-authed')
    },
  },
}
</script>