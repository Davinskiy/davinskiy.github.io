<script setup lang="ts">
import { ref } from 'vue'
import Tag from 'primevue/tag'
import { storeApp } from '@/01_shared/stores/'

const store = storeApp()

console.log(store.getAllTags)

</script>

<template>
  <div class="card flex flex-wrap justify-content-center gap-2">
    <Tag
      v-for="tag in store.getAllTags"
      :key="tag"
      :icon="store.isTagChecked(tag) ? 'pi pi-check' : ''"
      :severity="store.isTagChecked(tag) ? 'success' : ''"
      :value="tag"
      class="select-none cursor-pointer"
      @click="store.toggleTag(tag)"
    ></Tag>
  </div>
</template>

<style>

.p-tag:not(.p-tag-success) {
  background-color: #333;
}

</style>