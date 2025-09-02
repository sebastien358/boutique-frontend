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
        const { title, description, price, category, images } = dataProduct;
        const formData = new FormData();
        formData.append('title', title)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('category', category)
        if (images && images.length > 0) {
           images.forEach(image => {
            formData.append('filename[]', image)
          })
        }
        const productStore = useProductStore();
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
        const { title, description, price, images, category } = dataProduct; 
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        // Envoie les nouvelles images
        if (images && images.length > 0) {
          const newImages = images.filter(image => image instanceof File);
          newImages.forEach((image) => {
            formData.append('filename[]', image);
          });
        }
        const response = await axiosAdminUpdateProduct(formData, id); 
        const productIndex = productStore.products.findIndex(p => p.id === response.id); 
        const index = this.products.findIndex(product => product.id === response.id); 
        if (index !== -1) { 
          this.products[index] = { ...this.products[index], ...response }; 
          this.products[index].images = response.pictures; 
        } 
        if (productIndex !== -1) { 
          productStore.products[productIndex] = { ...productStore.products[productIndex], ...response }; 
          productStore.products[productIndex].images = response.pictures; 
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