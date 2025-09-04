import { defineStore } from 'pinia'
import type { LoginInterface, RegisterInterface } from '@/shared/services/interfaces';
import { authMiddleware, axiosEmailExist, axiosLogin, axiosRegister } from '@/shared/services/auth.service';
import { jwtDecode } from 'jwt-decode';
// import { jwtDecode } from 'jwt-decode';

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
          localStorage.setItem(TOKEN_KEY, response.token);
          authMiddleware(TOKEN_KEY);
          this.isLoggedIn = true;
          console.log('TOKEN_KEY : ', response.token);
          if (!this.checkTokenExpiration()) {
            console.log('Token : Le token n\'est plus valide');
          }
        } else {
          console.log('Erreur token : Token non défini');
        }
      } catch (e) {
        console.log('Erreur connexion', e);
      }
    },
    async register(dataRegister: RegisterInterface) {
      try {
        const response = await axiosRegister(dataRegister);
        return response;
      } catch(e) {
        console.error('Erreur de l\'inscription', e);
      }
    },
    async emailExists(dataRegister?: string, dataLogin?: string): Promise<any> {
      try {
        const response = await axiosEmailExist(dataRegister, dataLogin);
        return response;
      } catch(e) {
        console.error('Erreur de la récupération d\'un email utilisateur');
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
    logout(router) {
      localStorage.removeItem(TOKEN_KEY);
      this.isLoggedIn = false;
      router.push({path: '/login'})
    }
  },
})
