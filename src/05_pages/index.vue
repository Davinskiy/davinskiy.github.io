<script setup lang="ts">
import TopHeader from '@/03_features/top-header.vue'

defineOptions({ name: 'Pages' })
</script>

<template>
  <div>
    <TopHeader />
    <RouterView />
  </div>
</template>
