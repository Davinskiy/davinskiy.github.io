<template>
  <v-app-bar
    app
    clipped-right
    color="orange"
    dark
  >
    <v-app-bar-nav-icon
      class="d-block  d-sm-none"
      @click.stop="drawerToggle"
    />

    <v-spacer />

    <v-toolbar-items 
      class="d-none d-sm-flex"
    >
      <v-btn
        v-for="(menu_item, index) in menu"
        :key="index"
        :to="menu_item.url"
        text
      >
        <v-icon class="mr-3">{{ menu_item.icon }}</v-icon>
        {{ menu_item.title }}
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    drawerToggle(){
      this.$root.$emit('drawer-toggle')
    },
  }
}
</script>