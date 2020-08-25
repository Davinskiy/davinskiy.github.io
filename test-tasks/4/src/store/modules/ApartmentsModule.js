export default {
  state(){
    return {
      apartments: require('@/../public/json/apartments.json'),
      liked_apartments: JSON.parse(localStorage.liked_apartments || '[2]'),
    }
  },
  getters: {
    getApartments: state => state.apartments.response,
    getLikedIDs: state => state.liked_apartments,
  },
  mutations: {
    toggleLikedApartment(state, apartmentID){
      if (state.liked_apartments.includes(apartmentID)) {
        state.liked_apartments.splice(state.liked_apartments.indexOf(apartmentID), 1)
      } else {
        state.liked_apartments.push(apartmentID)
      }

      localStorage.setItem('liked_apartments', JSON.stringify(state.liked_apartments))
    },
  },
}
