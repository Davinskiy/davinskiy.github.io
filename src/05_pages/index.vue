<script setup lang="ts">
import TopHeader from '@/03_features/top-header.vue'
import Footer from '@/03_features/footer.vue'

defineOptions({ name: 'Pages' })
</script>

<template>
  <div class="flex flex-column min-h-screen">
    <TopHeader />
    <div>
      <div class="container">
        <RouterView />
      </div>
    </div>
    <Footer class="mt-auto" />
  </div>
</template>
