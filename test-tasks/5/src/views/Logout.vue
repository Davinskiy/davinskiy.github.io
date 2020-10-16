<template>
  <i />
</template>

<script>
export default {
  beforeMount(){
    this.$store.commit('logout')
    this.$router.push({name: 'auth'})
  },
}
</script>