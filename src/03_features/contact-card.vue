<script setup lang="ts">
import { type IContactsDataItem } from '@/01_shared/data/contacts-data'
import { defineProps } from 'vue'

defineOptions({ name: 'ContactCard' })

const props = defineProps<IContactsDataItem>()
</script>

<template>
  <div class="contact-card">
    <h3 class="contact-card__caption">{{ props.caption }}</h3>
    <div class="contact-card__list">
      <div
        v-for="link, i in props.links"
        :key="i"
        class="contact-card__list-item"
      >
        <img
          :src="'/icons/' + link.img"
          class="contact-card__list-icon"
        >
        <a
          :href="link.href"
          target="_blank"
          class="link"
        >{{ link.label }}</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.contact-card {
  width: 100%;
  background-color: #272727;
  color: #eee;
  border-radius: 10px;
  padding: 20px;

  &__caption {
    margin: 0;
    font-weight: 600;
    text-align: center;
  }

  &__list {
    padding-top: 15px;
  
    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
  
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    &-icon {
      width: 20px;
      margin-right: 10px;
    }
  }
}

@media all and (max-width: 992px) {
	.contact-card {
		padding: 25px 10px;
	}
}
</style>