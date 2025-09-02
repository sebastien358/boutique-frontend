import axios from 'axios';

export async function axiosAdmingetCategories() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/admin/category/list');
    return response.data;
  } catch(e) {
    console.error('Erreur serveur : ', e);
    throw e;
  }
}