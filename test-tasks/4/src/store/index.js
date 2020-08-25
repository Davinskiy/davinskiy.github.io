import Vue from 'vue'
import Vuex from 'vuex'

// modules
import ApartmentsModule from './modules/ApartmentsModule.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    ApartmentsModule,
  },
  getters: {
    app: state => state.app,
  },
})

export default store
