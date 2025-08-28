import axios from 'axios';

export async function axiosGetProducts() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/product');
    return response.data;
  } catch(e) {
    console.error('Erreur serveur : ', e);
  }
}

export async function axiosGetFilteredProducts(searchTerm: string) {
  try {
    const response = axios.get('http://127.0.0.1:8000/product/search', {
      params: {
        search: searchTerm
      }
    })
    return (await response).data;
  } catch(e) {
    console.log('Erreur serveur : ', e);
  }
}

