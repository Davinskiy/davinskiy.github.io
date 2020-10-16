<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    temporary
  >
    <v-list dense>
      <v-list-item
        v-for="(menu_item, index) in menu"
        :key="index"
        :to="menu_item.url"
      >
        <v-list-item-action>
          <v-icon>{{ menu_item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ menu_item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Drawer",
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return {
      drawer: null,
    }
  },
  mounted(){
    this.$root.$on('drawer-toggle', () => {
      this.drawer = !this.drawer
    })
  },
}
</script>