import ApiAuth from '@/service/ApiAuth'

export default {
  state(){
    return {
      leadhit_site_id: localStorage.getItem('leadhit-site-id') || '',
    }
  },
  mutations: {
    login(state, auth_id) {
      state.leadhit_site_id = auth_id
      localStorage.setItem('leadhit-site-id', auth_id)
    },
    logout(state) {
      localStorage.removeItem('leadhit-site-id')
      state.leadhit_site_id = ''
    },
  },
  getters: {
    isAuthenticated: state => !!state.leadhit_site_id,
  },
  actions: {
    async AUTH({ commit }, auth_id) {
      let { data } = await ApiAuth.auth(auth_id)
      if(data.message === 'ok') {
        commit('login', auth_id)
      }
    },
  },
}
