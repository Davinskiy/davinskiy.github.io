<template>
  <div class="apartments">
    <Apartment
      v-for="(apartment, i) in getApartments"
      :key="i"
      :apartment="apartment"
    />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import Apartment from './ApartmentItem'

export default {
  name: 'ApartmentItem',
  components: {
    Apartment,
  },
  computed: {
    ...mapGetters([
      'getApartments',
    ])
  },
}
</script>

<style lang="scss">

.apartments {
  padding: 60px 0;

  display: grid;
  grid-template-columns: minmax(320px, 1fr) minmax(320px, 1fr) minmax(320px, 1fr);
  justify-content: center;
  grid-gap: 30px;
}

@media all and (max-width: 1200px) {
  .apartments {
    grid-template-columns: minmax(320px, 1fr) minmax(320px, 1fr);
    grid-gap: 20px;
  }
}
@media all and (max-width: 768px) {
  .apartments {
    grid-template-columns: 1fr;
  }
}

</style>
