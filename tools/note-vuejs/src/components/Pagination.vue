<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="length"
      :total-visible="7"
    ></v-pagination>
  </div>
</template>
<script>
  export default {
    props : ['page_start', 'length'],
    watch : {
      page : function() {
        this.$emit("pageChange", this.page);
      },
      page_start : function() {
        this.page = this.page_start;
      }
    },
    created() {
      this.page = this.page_start;
    },
    data () {
      return {
        page: 1,
      }
    },
  }
</script>