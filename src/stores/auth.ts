import Cookies from 'universal-cookie'
import { defineStore } from 'pinia'
import axios from 'axios'
const cookies = new Cookies(null, { path: '/' })
const addAxiosAuthHeader = (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
addAxiosAuthHeader(cookies.get('token'))

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: cookies.get('token')
  }),
  actions: {
    getToken() {
      return cookies.get('token')
    },
    setToken(token: string) {
      this.token = token
      cookies.set('token', token)
      addAxiosAuthHeader(token)
    },
    logout() {
      this.token = null
      cookies.remove('token')

      this.router.push({ name: 'home' })
    }
  }
})
