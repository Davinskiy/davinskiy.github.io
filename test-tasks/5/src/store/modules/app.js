/**
 * app
 * Здесь хранится логика для всего приложения (общая информация)
 */

// import ApiApp from '@/service/ApiApp'

export default {
  state: () => ({
    profile: localStorage.profile ? JSON.parse(localStorage.profile) : {},
  }),
  mutations: {
    update_profile (state, profile) {
      state.profile = profile
      localStorage.setItem('profile', JSON.stringify(profile))
    },
    update_profile_clan (state, payload) {
      state.profile.clan_id = payload.clan_id
      state.profile.clan_rank = payload.clan_rank
      localStorage.setItem('profile', JSON.stringify(state.profile))
    },
    update_rank(state, rank) {
      state.profile.rank = rank
      localStorage.setItem('profile', JSON.stringify(state.profile))
    },
  },
  getters: {
    get_profile: state => state.profile,
  },
  actions: {},
}
