import { defineStore } from 'pinia'
import { authMiddleware, axiosEmailExists, axiosLogin, axiosRegister } from '@/shared/services/auth.service'
import type { LoginInterface, RegisterInterface } from '@/shared/services/interfaces'
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'token';

interface StateAuthentification {
  token: string,
  isLoggedIn: boolean,
}

export const useAuthStore = defineStore('auth', {
  state: (): StateAuthentification => ({
    token: localStorage.getItem(TOKEN_KEY),
    isLoggedIn: !!localStorage.getItem(TOKEN_KEY),
  }),
  actions: {
    async login(dataLogin: LoginInterface) {
      try {
        const response = await axiosLogin(dataLogin);
        if (response && response.token) {
          this.isLoggedIn = true;
          localStorage.setItem(TOKEN_KEY, response.token);
          authMiddleware(TOKEN_KEY);
          console.log('TOKEN : ', response.token);
          if (!this.checkTokenExpiration()) {
            console.log('LE TOKEN A EXPIRÉ');
          }
        } else {
          console.log('Erreur connexion : token non défini');
        }
      } catch (e) {
        console.log('Erreur connexion', e);
      }
    },
    checkTokenExpiration() {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        const decodedToken = jwtDecode(token);
        const expiresAt = decodedToken.exp;
        if (new Date().getTime() / 1000 > expiresAt) {
          this.logout();
          window.location.href = '/login';
          return false;
        }
        return true;
      }
      return false;
    },
    async register(dataRegister: RegisterInterface) {
      try {
        const response = await axiosRegister(dataRegister)
        return response;
      } catch (e) {
        console.error(e);
      }
    },
   async emailExists(dataLogin: string) {
      try {
        const result = await axiosEmailExists(dataLogin);
        return result;
      } catch (e) {
        console.error('Erreur serveur', e);
        throw e;
      }
    },
    logout() {
      this.isLoggedIn = null;
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/login';
    },
  },
})
