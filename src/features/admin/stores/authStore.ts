import { defineStore } from 'pinia'
import { authMiddleware, axiosEmailExists, axiosLogin, axiosRegister } from '@/shared/services/auth.service'
const TOKEN_KEY = 'token'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem(TOKEN_KEY),
    isLoggedIn: !!localStorage.getItem(TOKEN_KEY),
  }),
  actions: {
    async login(dataLogin) {
      try {
        const response = await axiosLogin(dataLogin)
        if (response && response.token) {
          this.isLoggedIn = true
          localStorage.setItem(TOKEN_KEY, response.token)
          authMiddleware(TOKEN_KEY);
          console.log('TOKEN : ', response.token)
        } else {
          console.log('Erreur connexion : token non défini')
        }
      } catch (e) {
        console.log('Erreur connexion', e)
      }
    },
    async register(dataRegister) {
      try {
        const response = await axiosRegister(dataRegister)
        return response;
      } catch (error) {
        console.error(error)
        if (error.response) {
          console.error(error.response.data)
        }
        throw error
      }
    },
   async emailExists(dataLogin) {
      try {
        const result = await axiosEmailExists(dataLogin);
        return result;
      } catch (e) {
        console.error('Erreur serveur', e);
        throw e;
      }
    },
    logout() {
      this.isLoggedIn = null
      localStorage.removeItem(TOKEN_KEY)
      window.location.href = '/login'
    },
  },
})
