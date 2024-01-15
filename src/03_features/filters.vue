<script setup lang="ts">
import { defineProps } from 'vue'
import Tag from 'primevue/tag'
import { storeApp } from '@/01_shared/stores/'

const store = storeApp()

interface IProps {
  tags: string[]
  clickable?: boolean
}

const props = defineProps<IProps>()

</script>

<template>
  <div class="flex flex-wrap align-items-center gap-2">
    <slot name="item" />
    <Tag
      v-for="tag in props.tags"
      :key="tag"
      :severity="store.isTagChecked(tag) ? 'success' : ''"
      :value="tag"
      :class="`select-none ${ clickable ? 'cursor-pointer' : '' }`"
      @click="clickable && store.toggleTag(tag)"
    ></Tag>
  </div>
</template>

<style>

.p-tag:not(.p-tag-success) {
  background-color: #444;
}

</style>