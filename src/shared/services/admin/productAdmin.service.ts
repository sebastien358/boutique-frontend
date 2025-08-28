import axios from 'axios';

export async function axiosAdminGetProducts() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/admin/product');
    return response.data;
  } catch(e) {
    console.error ('Erreur serveur : ', e);
    throw e;
  }
}

export async function axiosAdminGetProductId(id: string) {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/admin/product/${id}`);
    return response.data;
  } catch(e) {
    console.error ('Erreur serveur : ', e);
    throw e;
  }
}

export async function axiosAdminAddProduct(formData) {
  try {
    const response = await axios.post('http://127.0.0.1:8000/admin/product/new', formData);
    return response.data;
  } catch(e) {
    console.error('Erreur serveur : ', e.response);
    if (e.response) {
      console.error('Données de l\'erreur : ', e.response.data);
      console.error('Statut de l\'erreur : ', e.response.status);
    }
  }
}

export async function axiosAdminUpdateProduct(formData, id: string) {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/admin/product/update/${id}`, formData);
    return response.data;
  } catch(e) {
    console.error('Erreur serveur : ', e.response);
    if (e.response) {
      console.error('Données de l\'erreur : ', e.response.data);
      console.error('Statut de l\'erreur : ', e.response.status);
    }
  }
}

export const axiosAdminDeleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/admin/product/delete/${id}`);
    return response.data;
  } catch(e) {
    console.error('Erreur serveur :', e);
  }
} 

export const axiosAdminDeletePicture = async (productId: string, pictureId: string) => {
   try {
    const response = await axios.delete(`http://127.0.0.1:8000/admin/product/${productId}/image/${pictureId}`);
    return response.data;
  } catch(e) {
    console.error('Erreur serveur :', e);
  }
}
