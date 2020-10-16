<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm8 md6>
        <h1 class="headline  text-center my-3">LeadHit</h1>
        <v-card>
          <v-card-text>
            <form>
              <v-text-field
                v-model="site_id"
                :error-messages="errors.site_id"
                label="ID сайта"

                @input="errors.site_id = ''"
              ></v-text-field>

              <v-btn @click="submit">Войти</v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: "Auth",

  data(){
    return {
      site_id: '5f8475902b0be670555f1bb3',
      errors: {
        site_id: '',
      },
    }
  },

  methods: {
    async submit() {
      if(this.site_id.length != 24) {
        this.errors.site_id = 'ID сайта должен содержать 24 символа'
      } else {
        try {
          await this.$store.dispatch('AUTH', this.site_id)
          this.$router.push({
            name: 'analytics'
          })
        } catch (error) {
          console.log('error:', error)
          this.errors.site_id = 'Неправильный ID'
        }
      }
    },
  }
}

</script>