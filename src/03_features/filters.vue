<script setup lang="ts">
import { ref } from 'vue'
import Tag from 'primevue/tag'

const tags = ref([
  {
    label: 'vue',
    checked: false,
  },
  {
    label: 'pinia',
    checked: false,
  },
  {
    label: 'nuxt',
    checked: false,
  },
  {
    label: 'php',
    checked: false,
  },
  {
    label: 'react',
    checked: false,
  },
  {
    label: 'phaser',
    checked: false,
  },
])

</script>

<template>
  <div class="card flex flex-wrap justify-content-center gap-2">
    <Tag
      v-for="tag in tags"
      :key="tag.label"
      :icon="tag.checked ? 'pi pi-check' : ''"
      :severity="tag.checked ? 'success' : ''"
      :value="tag.label"
      class="select-none cursor-pointer"
      @click="tag.checked = !tag.checked"
    ></Tag>
  </div>
</template>

<style>

.p-tag:not(.p-tag-success) {
  background-color: #333;
}

</style>