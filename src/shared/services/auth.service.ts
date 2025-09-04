import axios from 'axios';
import type { LoginInterface, RegisterInterface } from './interfaces';

export async function axiosRegister(dataRegister: RegisterInterface): Promise<RegisterInterface> {
  try {
    const { email, password } = dataRegister;
    const response = await axios.post('http://127.0.0.1:8000/api/register', {
      email, password
    })
    return response.data;
  } catch(e) {
    console.error('Erreur serveur : ', e);
    throw e;
  }
}

export async function axiosLogin(dataLogin: LoginInterface): Promise<LoginInterface> {
  try {
    const { email, password } = dataLogin;
    const response = await axios.post('http://127.0.0.1:8000/api/login_check', {
      username: email, password
    })
    return response.data;
  } catch(e) {
    console.error('Erreur serveur : ', e);
    throw e;
  } 
}

export async function axiosEmailExist(dataRegister?: string, dataLogin?: string): Promise<any> {
  try {
    if (dataRegister) {
      const response = await axios.post('http://127.0.0.1:8000/api/emailExists', {
        email: dataRegister.email
      });
      return response.data.exists;
    }
    if (dataLogin) {
        const response = await axios.post('http://127.0.0.1:8000/api/emailExists', {
        email: dataLogin.email
      });
      return response.data.exists;
    }
  }  catch(e) {
    console.error('Erreur serveur : ', e);
    throw e;
  }
}

export const authMiddleware = (TOKEN_KEY: string) => (config: any) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}
axios.interceptors.request.use(authMiddleware('token'));









