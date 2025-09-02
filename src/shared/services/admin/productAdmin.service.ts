import axios from 'axios';
import type { ProductFormInterface, ProductInterface } from '../interfaces';

export async function axiosAdminGetProducts(): Promise<ProductInterface[] | null> {
  try {
    const response = await axios.get('http://127.0.0.1:8000/admin/product');
    return response.data;
  } catch(e) {
    console.error ('Erreur serveur : ', e);
    throw e;
  }
}

export async function axiosAdminGetProductId(id: number): Promise<ProductInterface | null> {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/admin/product/${id}`);
    return response.data;
  } catch(e) {
    console.error ('Erreur serveur : ', e);
    throw e;
  }
}

export async function axiosAdminAddProduct(formData: ProductFormInterface): Promise<ProductFormInterface> {
  try {
    const response = await axios.post('http://127.0.0.1:8000/admin/product/new', formData);
    return response.data;
  } catch(e) {
    console.error('Erreur serveur : ', e);
    throw e;
  }
}

export async function axiosAdminUpdateProduct(formData: ProductFormInterface, id: number): Promise<ProductFormInterface> {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/admin/product/update/${id}`, formData);
    return response.data;
  } catch(e) {
    console.error('Erreur serveur : ', e);
    throw e;
  }
}

export async function axiosAdminDeleteProduct(id: number): Promise<any> {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/admin/product/delete/${id}`);
    return response.data;
  } catch(e) {
    console.error('Erreur serveur :', e);
    throw e;
  }
} 

export async function axiosAdminDeletePicture(productId: number, pictureId: number): Promise<any> {
  try {
      const response = await axios.delete(`http://127.0.0.1:8000/admin/product/${productId}/picture/${pictureId}`);
      return response.data;
  } catch(e) {
    console.error('Erreur serveur : ', e);
    throw e;
  }
}
