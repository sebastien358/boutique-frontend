import { 
  axiosAdminAddProduct, 
  axiosAdminGetProducts, 
  axiosAdminDeleteProduct, 
  axiosAdminGetProductId, 
  axiosAdminUpdateProduct, 
  axiosAdminDeletePicture
} from '@/shared/services/admin/productAdmin.service';
import { defineStore } from 'pinia';
import { useProductStore } from '@/features/boutique/stores/productStore';

export const useAdminProductStore = defineStore('adminProduct', {
  state: () => ({
    products: [],
    isLoading: true
  }),
  actions: {
    async adminGetProducts() {
      try {
        this.isLoading = true;
        const response = await axiosAdminGetProducts();
        if (Array.isArray(response)) {
          this.products = response;
        } else {
          this.products = [response];
        }
        return this.products;
      } catch(e) {
        console.error('Erreur de la récupération des produits', e);
      } finally {
        this.isLoading = false;
      }
    },
    async getProductId(id: string) {
      try {
        const response = await axiosAdminGetProductId(id);
        return response;
      } catch(e) {
        console.error('Erreur de la récupération d\'un produit', e);
      }
    },
    async addProduct(dataProduct) {
      try {
        const productStore = useProductStore();
        const { title, description, price, images } = dataProduct;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        images.forEach((image) => {
          formData.append(`filename[]`, image);
        });
        const response = await axiosAdminAddProduct(formData);
        this.products.push(response);
        productStore.products.push(response);
      } catch(e) {
        console.error('Erreur de l\'ajout d\'un produit', e);
      }
    },
    async updateProduct(dataProduct, id: string) { 
      try { 
        const productStore = useProductStore(); 
        const { title, description, price, images } = dataProduct; 
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);

        // Envoie les nouvelles images
        const newImages = images.filter(image => image instanceof File);
        newImages.forEach((image) => {
          formData.append(`filename[]`, image);
        });

        const response = await axiosAdminUpdateProduct(formData, id); 

        const productIndex = productStore.products.findIndex(p => p.id === id); 
        const index = this.products.findIndex(product => product.id === id); 

        if (index !== -1) { 
          this.products[index] = { ...this.products[index], ...response.data }; 
          this.products[index].pictures = response.data.pictures; 
        } 
        if (productIndex !== -1) { 
          productStore.products[productIndex] = { ...productStore.products[productIndex], ...response.data }; 
          productStore.products[productIndex].pictures = response.data.pictures; 
        } 
      } catch(e) { 
        console.error('Erreur de la modification d\'un produit', e); 
      } 
    },
    async deleteProduct(id: string) {
      try {
        const productStore = useProductStore();
        await axiosAdminDeleteProduct(id);
        this.products = this.products.filter(p => p.id !== id);
        productStore.products = productStore.products.filter(p => p.id !== id);
      } catch(e) {
        console.log('Erreur de la suppression d\'un produit', e);
        throw e;
      }
    },
    async deleteImage(productId: string, pictureId: string) {
    try {
      return await axiosAdminDeletePicture(productId, pictureId);
    } catch(e) {
      console.log('Erreur de la suppression d\'une image', e);
      } 
    }
  }
});