<script setup lang="ts">
import Filters from '@/03_features/filters.vue'
import Portfolios from '@/04_widgets/portfolios.vue'

import { storeApp } from '@/01_shared/stores/'

const store = storeApp()

defineOptions({ name: 'Portfolios' })
</script>

<template>
  <div>
    <h2 class="section-heading">Портфолио</h2>

    <div class="flex justify-content-center">
      <filters clickable :tags="store.getAllTags">
        <template #item>
          <b>Фильтрация: </b>
        </template>
      </filters>
    </div>

    <Portfolios />
  </div>
</template>
