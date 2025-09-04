import { defineStore } from 'pinia'
import type { LoginInterface, RegisterInterface } from '@/shared/services/interfaces';
import { authMiddleware, axiosEmailExist, axiosLogin, axiosRegister } from '@/shared/services/auth.service';
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
          localStorage.setItem(TOKEN_KEY, response.token);
          authMiddleware(TOKEN_KEY);
          this.isLoggedIn = true;
          console.log('TOKEN_KEY : ', response.token);
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
    async checkTokenExpiration() {
      const token = localStorage.getItem('token');
      const lastActivity = localStorage.getItem('lastActivity');
      const tokenDuration = 15 * 60 * 1000; // 15 minutes
      if (!token) {
        console.log('Token non trouvé');
      } else {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = new Date().getTime();
          if (!lastActivity) {
            localStorage.setItem('lastActivity', currentTime);
          } else {
            const lastActivityTime = parseInt(lastActivity);
            if (currentTime - lastActivityTime > tokenDuration) {
              console.log('Token expiré : redirection vers la page de connexion');
              this.logout(router);
            } else {
              localStorage.setItem('lastActivity', currentTime);
            }
          }
        } catch (e) {
          console.log('Erreur lors du traitement du token', e);
        }
      }
    },
    logout(router) {
      localStorage.removeItem(TOKEN_KEY);
      this.isLoggedIn = false;
      router.push({path: '/login'})
    }
  },
})
