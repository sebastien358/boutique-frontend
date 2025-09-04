import { 
  axiosAddProduct,
  axiosAdminGetProduct,
  axiosAdminGetProducts,
  axiosAdminGetTotalItems,
  axiosDeleteImage,
  axiosDeleteProduct,
  axiosUpdateProduct, 
} from '@/shared/services/admin/productAdmin.service';
import { defineStore } from 'pinia';
import type { ProductFormInterface, ProductInterface } from '@/shared/services/interfaces';
import { useProductStore } from '@/features/boutique/stores/productStore';

interface StateAdminProduct {
  products: ProductInterface[],
  isLoading: boolean
}

export const useAdminProductStore = defineStore('adminProduct', {
  state: (): StateAdminProduct => ({
    products: [],
    isLoading: true
  }),
  actions: {
    async adminGetProducts(page = 1, limit = 10) {
      try {
        this.isLoading = true;
        const response = await axiosAdminGetProducts(page, limit);
        if (Array.isArray(response.products)) {
          this.products = response.products;
          this.totalItems = response.total;
        } else {
          this.products = [response.product];
          this.totalItems = 1;
        }
        return this.products;
      } catch (e) {
        console.error('Erreur de la récupération des produits', e);
      } finally {
        this.isLoading = false;
      }
    },
    async getTotalItems() {
      try {
        const response = await axiosAdminGetTotalItems();
        return response;
      } catch(e) {
        console.error('Erreur', e);
      }
    },
    async getProduct(id: number) {
      try {
        const response = await axiosAdminGetProduct(id);
        return response;
      } catch(e) {
        console.error('Erreur de la récupération d\'un produit', e);
      }
    },
    async addProduct(dataProduct: ProductFormInterface) {
      try {
        const formData = new FormData();
        const { title, price, description, images, category } = dataProduct;
        formData.append('title', title);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        if (images && images.length > 0) {
          images.forEach(image => {
            formData.append('filename[]', image);
          });
        }
        const response = await axiosAddProduct(formData);
        this.products = response;
      } catch(e) {
        console.error('Erreur de l\'ajout d\'un produit', e);
      }
    },
    async updateProduct(dataProduct: ProductFormInterface, id: string) {
      try {
        const productStore = useProductStore(); 
        const { title, description, price, images, category } = dataProduct; 
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        if (images && images.length > 0) {
          const newImages = images.filter(image => image instanceof File);
          newImages.forEach((image) => {
            formData.append('filename[]', image);
          });
        }
        const response = await axiosUpdateProduct(formData, id);
        const index = this.products.findIndex(product => product.id === response.id);
        const productIndex = productStore.products.findIndex(product => product.id === response.id);
        if (index !== -1) {
          this.products[index] = { ...this.products[index], ...response };
          this.products[index].images = response.image
        }
        if (productIndex !== -1) {
          productStore.products[productIndex] = { ...productStore.products[productIndex], ...response };
          productStore.products[productIndex].images = response.image
        }
      } catch (e) {
        console.error('Erreur de la modification d\'un produit', e);
      }
    },
    async deleteProduct(id: number) {
      try {
        const productStore = useProductStore();
        await axiosDeleteProduct(id);
        this.products = this.products.filter(p => p.id !== id);
        productStore.products = productStore.products.filter(p => p.id !== id);
      } catch(e) {
        console.error('Erreur de la supression d\'un produit', e);
      }
    },
    async deleteImage(productId: number, pictureId: number) {
      try {
        const response = await axiosDeleteImage(productId, pictureId);
        return response;
      } catch(e) {
        console.error('Erreur de la suppression d\'une image', e);
      }
    }
  }
});