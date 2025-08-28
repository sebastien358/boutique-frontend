import axios from 'axios';

export async function axiosRegister(dataRegister) {
  try {
    const response = await axios.post('http://127.0.0.1:8000/register', {
      email: dataRegister.email,
      password: dataRegister.password
    });
    return response.data;
  } catch(e) {
    console.error('Erreur serveur : ', e) 
  }
}

export async function axiosLogin(dataLogin) {
  try {
    const { email, password } = dataLogin;
    const response = await axios.post('http://127.0.0.1:8000/api/login_check', {
      username: email,
      password
    });
    return response.data;
  } catch(e) {
    console.log('Erreur serveur login : ', e);
    throw e;
  }
}

export const axiosEmailExists = async (dataLogin) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/check-email', {
      email: dataLogin.email
    });
    return response.data.exists;
  } catch(e) {
    console.log('Erreur Serveur : ', e);
    throw e;
  }
}

export const authMiddleware = (TOKEN_KEY) => (config) => {
  console.log('Auth middleware appelé');
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Request headers :', config.headers);
  return config;
}

axios.interceptors.request.use(authMiddleware('token'));









