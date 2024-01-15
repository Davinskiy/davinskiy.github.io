<script setup lang="ts">
import { computed } from 'vue'
import Filters from '@/03_features/filters.vue'
import Portfolios from '@/04_widgets/portfolios.vue'
import { storeApp } from '@/01_shared/stores/'

defineOptions({ name: 'Portfolios' })

const store = storeApp()

const getPortfoliosCount = computed(() => {
  if (store.getFilteredPortfolios.length === store.portfolios.length) {
    return store.portfolios.length
  }
  return `${store.getFilteredPortfolios.length} / ${store.portfolios.length}`
})

</script>

<template>
  <div>
    <h2 class="section-heading">Портфолио ({{ getPortfoliosCount }})</h2>

    <div class="flex justify-content-center max-w-30rem m-auto">
      <filters clickable :tags="store.getAllTags">
        <template #item>
          <b>Фильтрация: </b>
        </template>
      </filters>
    </div>

    <Portfolios />
  </div>
</template>
