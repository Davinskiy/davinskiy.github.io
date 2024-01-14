<script setup lang="ts">
import ContactCard from '@/03_features/contact-card.vue'

defineOptions({ name: 'Contacts' })

const linksData = [
  {
    caption: 'Соц. сети',
    links: [
      {
        img: 'vk.svg',
        href: 'https://vk.com/jhasuev',
        label: 'vk.com/jhasuev',
      },
      {
        img: 'instagram.svg',
        href: 'https://www.instagram.com/jhasuev',
        label: 'instagram.com/jhasuev',
      },
    ],
  },
  {
    caption: 'Мессенджеры',
    links: [
      {
        img: 'whatsapp.svg',
        href: 'whatsapp://send?phone=+79286873132',
        label: 'WhatsApp (+7 (928) 687-31-32)',
      },
      {
        img: 'tg.svg',
        href: 'tg://resolve?domain=jhasuev',
        label: 'Telegram (@jhasuev)',
      },
    ],
  },
  {
    caption: 'Другие способы',
    links: [
      {
        img: 'email.svg',
        href: 'mailto:jhasuev@mail.ru',
        label: 'jhasuev@mail.ru',
      },
      {
        img: 'phone.svg',
        href: 'tel:+79286873132',
        label: '+7 (928) 687-31-32',
      },
    ],
  },
]

</script>

<template>
  <div>
    <h2 class="section-heading">Контакты</h2>

    <div class="contacts__text">
      Если Вы хотите со мной сотрудничать или просто задать вопрос касаемый вашего проекта — пишите любым удобным для Вас способом!
    </div>

    <div class="contacts__box">
      <template
        v-for="data, i in linksData"
        :key="i"
      >
        <i v-if="i" class="contacts__item-circle"></i>
        <ContactCard v-bind="data" />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.contacts__text {
  font-weight: 300;
  line-height: 1.5;
}
.contacts__box {
  padding-top: 30px;
  display: flex;
  justify-content: center;
}

.contacts__item-circle {
  position: relative;
  z-index: 9;
  align-self: center;
  border-radius: 50%;
  width: 60px;
  min-width: 60px;
  height: 60px;
  min-height: 60px;
  background-color: #272727;
  border: 15px solid #fff;
  margin: 0 -15px;
}

@media all and (max-width: 992px) {
  .contacts__box {
    flex-direction: column;
    align-items: center;
  }
  .contacts__item-circle {
    margin: -15px 0;
  }
}
</style>