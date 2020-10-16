import axios from "axios"
import store from "@/store"

const api = axios.create({
  baseURL: "https://track-api.leadhit.io/",
  headers: {
    Accept: "application/json",
    "Api-Key": "5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo",
  },
})

api.interceptors.response.use(
  response => {
    return response
  },
  (error) => {
    if (error.response.status === 401 && store.getters.get_token) {
      store.commit("logout")
    }
    return Promise.reject(error)
  },
)

export default api
