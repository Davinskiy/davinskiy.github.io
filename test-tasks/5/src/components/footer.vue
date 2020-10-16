<template>
  <v-footer
    app
    color="orange"
    class="white--text  text-center"
  >
    <v-spacer />
    <span>
      &copy; {{ getWorkingYear }}
    </span>
    <v-spacer />
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    getWorkingYear(){
      let create_year = 2020
      let this_year = new Date().getFullYear()
      if (create_year >= this_year)
        return create_year
      return `${create_year}-${this_year}`
    },
  },
}
</script>