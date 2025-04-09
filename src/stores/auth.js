import { defineStore, acceptHMRUpdate } from 'pinia'
import localStorageService from 'services/localStorage.service'
import { handleAuthRequest } from '@/utils/apiHelper'
import AuthService from '@/services/auth.service'
import NotifyService from '@/services/notify.service'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorageService.getItem('user') || null,
    accessToken: localStorageService.getItem('accessToken') || null,
    accessTokenExpiry: localStorageService.getItem('accessTokenExpiry') || null,
  }),

  getters: {
    isAuthenticated: (state) => {
      if (!state.accessToken || !state.accessTokenExpiry) return false
      const currentTime = Math.floor(Date.now() / 1000)
      return currentTime < state.accessTokenExpiry
    },
  },

  actions: {
    async signup(payload) {
      try {
        const response = await AuthService.signup(payload)
        if (response.data?.success) {
          return true
        } else {
          NotifyService.error(response.data?.message)
        }
      } catch {
        NotifyService.error()
        return false
      }
    },

    async login(payload) {
      return handleAuthRequest(this, () => AuthService.login(payload), this.router)
    },

    async setPassword(token, uidb64, payload) {
      return handleAuthRequest(this, () => AuthService.setPassword(token, uidb64, payload), this.router)
    },

    async logout() {
      localStorageService.clear()
      this.user = null
      this.accessToken = null
      this.accessTokenExpiry = null
      this.router.push('/login')
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}