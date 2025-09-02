import axios from 'axios';
import type { ProductInterface } from './interfaces';

export async function axiosGetProducts(): Promise<ProductInterface[] | null> {
  try {
    const response = await axios.get('http://127.0.0.1:8000/product');
    return response.data;
  } catch(e) {
    console.error('Erreur serveur : ', e);
    throw e;
  }
}

export async function axiosSearchProducts(searchTerm: string): Promise<any> {
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

export async function axiosgetFilteredProductPrice(minPrice: number, maxPrice: number): Promise<anyr> {
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

export async function axiosgetFilteredProductCategory(category: string): Promise<any> {
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