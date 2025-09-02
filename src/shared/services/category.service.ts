import axios from 'axios';
import type { CategoryInterface } from './interfaces';

export async function axiosAdmingetCategories(): Promise<CategoryInterface[] | null> {
  try {
    const response = await axios.get('http://127.0.0.1:8000/admin/category/list');
    return response.data;
  } catch(e) {
    console.error('Erreur serveur : ', e);
    throw e;
  }
}