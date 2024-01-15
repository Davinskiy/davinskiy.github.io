<script setup lang="ts">
import { defineProps } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import type { IPortfolio } from '@/01_shared/data/portfolios-list';
import Filters from '@/03_features/filters.vue';

defineOptions({ name: 'PortfoliosCard' })

const props = defineProps<IPortfolio>()

</script>

<template>
   <Card
    class="min-h-full flex flex-column"
   >
    <template #header>
      <i
        class="portfolios-card__img"
        :style="{ backgroundImage: `url(${ props.preview_img })` }"
      />
    </template>
    
    <template #content>
      <h3 class="mt-0">{{ props.title }}</h3>

      <filters class="mt-auto" :tags="props.tags" />

      <Button label="Посмотреть" size="small" class="w-full mt-3" />
    </template>
  </Card>
</template>

<style lang="scss">

.portfolios-card__img {
  display: block;
  padding-top: 50%;
  background: center center no-repeat;
  background-size: contain;
  background-color: #eee;
  border-radius: 8px 8px 0 0;
}

.p-card-content {
  padding: 0;
}

.p-card-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.p-card-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

</style>