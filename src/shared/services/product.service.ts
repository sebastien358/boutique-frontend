import axios from 'axios';
import type { ProductInterface } from './interfaces';

export async function axiosGetProducts(): Promise<ProductInterface[] | null> {
  try {
    const response = await axios.get('http://127.0.0.1:8000/products');
    return response.data;
  } catch(e) {
    console.error('Erreur serveur : ', e);
    throw e;
  }
}

export async function axiosSearchProducts(search :string): Promise<string>{
  try {
    const response = await axios.get('http://127.0.0.1:8000/products/search', {
      params: {
        search
      }
    });
    return response.data;
  } catch(e) {
    console.error('Erreur serveur : ', e);
    throw e;
  }
}

export async function axiosFilteredProductsPrice(minPrice: number, maxPrice: number): Promise<number>{
  try {
    const response = await axios.get('http://127.0.0.1:8000/products/filtered/price', {
      params: {
        minPrice, 
        maxPrice
      }
    });
    return response.data;
  } catch(e) {
    console.error('Erreur serveur : ', e);
    throw e;
  }
}

export async function axiosFilteredProductsCategory(category: string): Promise<string>{
  try {
    const response = await axios.get('http://127.0.0.1:8000/products/filtered/category', {
      params: {
        category
      }
    });
    return response.data;
  } catch(e) {
    console.error('Erreur serveur : ', e);
    throw e;
  }
}