<script setup lang="ts">

const menuList = [
  {
    label: 'Портфолио',
    to: '/portfolios',
  },
  {
    label: 'Контакты',
    to: '/contacts',
  },
]

</script>

<template>
  <div class="top-header">
    <router-link
      v-for="menuItem in menuList"
      :key="menuItem.label"
      :to="menuItem.to"
      class="top-header__item"
    >{{ menuItem.label }}</router-link>
  </div>
</template>

<style lang="scss">
.top-header {
  display: flex;
  gap: 15px;
  justify-content: center;

  padding: 15px;
  border-bottom: 1px solid #eee;

  &__item {
    color: #333;
    text-decoration: none;
    font-size: 18px;

    @media screen and (max-width: 480px) {
      font-size: 16px;
    }

    &:hover,
    &.router-link-active {
      text-decoration: underline;
    }
  }
}
</style>