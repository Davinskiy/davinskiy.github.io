<script setup lang="ts">
import PortfoliosCard from '@/03_features/portfolios-card.vue'
import { storeApp } from '@/01_shared/stores/'

const store = storeApp()

defineOptions({ name: 'PortfoliosWidget' })
</script>

<template>
  <div>
    <div
      v-if="store.getFilteredPortfolios.length"
      class="grid grid-nogutter -mx-2 mt-4"
    >
      <div
        v-for="portfolio, i in store.getFilteredPortfolios"
        :key="i"
        class="col-12 sm:col-6 lg:col-4 p-2"
      >
        <PortfoliosCard
          v-bind="portfolio"
        />
      </div>
    </div>
    <div v-else class="mt-5 text-center">
      <i class="pi pi-search text-3xl"></i>
      <div class="text-lg mt-2">Нет таких проектов записей</div>
    </div>
  </div>
</template>

<style lang="scss">
</style>