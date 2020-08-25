<template>
  <div class="apartment">
    <h3 class="apartment__title">{{ apartment.attributes.title }}</h3>
    <div class="apartment__info">
      <p>
        <span class="apartment__info--bold">Кол-во комнат:</span> {{ apartment.attributes.rooms }}
      </p>
      <p>
        <span class="apartment__info--bold">Адрес:</span>
        {{ apartment.attributes.address.city }},
        {{ apartment.attributes.address.street }},
        д.н. {{ apartment.attributes.address.house }},
        кв. {{ apartment.attributes.address.room }}
      </p>
      <p>
        <span class="apartment__info--bold">Площадь:</span>
        {{ apartment.attributes.area }}
        {{ apartment.attributes.unit }}
      </p>
      <p class="apartment__info--mt-1em">
        <span class="apartment__info--bold">Владелец:</span>
        {{ getFormattedFIO({...apartment.relationships.attributes}) }}
      </p>
    </div>
    <button
      class="apartment__like"
      :class="{'apartment__like--liked' : isLiked}"
      @click="onClickLike"
    >
      <img src="/img/icons/heart.svg">
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ApartmentItem',
  props: {
    apartment: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters([
      'getLikedIDs',
    ]),
    isLiked(){
      return this.getLikedIDs.includes(this.apartment.id)
    },
  },
  methods: {
    getFormattedFIO(fio){
      return `${fio.first_name} ${fio.last_name[0].toUpperCase()}. ${fio.middle_name[0].toUpperCase()}.`
    },
    onClickLike(){
      this.$store.commit('toggleLikedApartment', this.apartment.id)
    },
  },
}
</script>

<style lang="scss">

.apartment {
  position: relative;
  z-index: 1;

  padding: 25px 15px;

  filter: drop-shadow(0 0 8px rgba(0,0,0,.25));

  color: #333;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    clip-path: polygon(0 15px, 15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%);
    background-color: #fff;
    border-radius: 5px;
  }

  &__title {
    font-size: 27px;
  }
  &__info {
    margin-top: 10px;
    font-size: 15px;

    &--bold {
      font-weight: bold;
    }

    &--mt-1em {
      margin-top: 1em;
    }
  }
  &__like {
    position: absolute;
    right: 15px;
    bottom: 5px;

    width: 17px;
    
    filter: grayscale(1);

    &:hover {
      filter: grayscale(.5);
    }
    &--liked,
    &--liked:hover {
      filter: grayscale(0);
    }

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}

</style>
