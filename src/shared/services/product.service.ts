import axios from 'axios';

export async function axiosGetProducts() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/product');
    return response.data;
  } catch(e) {
    console.error('Erreur serveur : ', e);
    throw e;
  }
}

export async function axiosSearchProducts(searchTerm: string) {
  try {
    const response = await axios.get('http://127.0.0.1:8000/product/search', {
      params: {
        search: searchTerm
      }
    })
    return response.data;
  } catch(e) {
    console.error('Erreur serveur : ', e);
    throw e;
  }
}

export async function axiosgetFilteredProductPrice(minPrice: number, maxPrice: number) {
  try {
     const response = await axios.get('http://127.0.0.1:8000/product/filtered/price', {
      params: {
        minPrice,
        maxPrice
      }
    })
    return response.data;
  } catch(e) {
    console.error('Erreur serveur : ', e);
    throw e;
  }
}

export async function axiosgetFilteredProductCategory(category: string) {
  try {
    const response = await axios.get('http://127.0.0.1:8000/product/filtered/category', {
    params: {
      category
    }
  })
    return response.data;
  } catch(e) {
    console.error('Erreur serveur : ', e);
    throw e;
  }
}