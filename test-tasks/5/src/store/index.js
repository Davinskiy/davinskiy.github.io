import Vue from 'vue'
import Vuex from 'vuex'

// modules
// import app from './modules/app'
import auth from './modules/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // app,
    auth,
  },
  mutations: {
    // eslint-disable-next-line
    HANDLE_ERROR(state, err) {
      console.log(err)
    },
  },
  getters: {
    app(state){
      return state.app
    },
  },
})

export default store
