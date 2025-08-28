import { axiosGetFilteredProducts, axiosGetProducts } from '@/shared/services/product.service';
import { defineStore } from 'pinia';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    isLoading: true,
    searchTerm: ''
  }),
  actions: {
    async getProducts(append = false) {
      try {
        this.isLoading = true
        const response = await axiosGetProducts();
        if (Array.isArray(response)) {
          if (append) {
            this.products = [...this.products, ...response];
          } else {
            this.products = response;
          }
        } else {
          if (append) {
            this.products = [...this.products, response];
          } else {
            this.products = [response];
          }
        }
      } catch(e) {
        console.error('Erreur de la récupértion des produits', e);
      } finally {
        this.isLoading = false
      }
    },
    async searchProduct(searchTerm: string) {
      try {
        const response = await axiosGetFilteredProducts(searchTerm);
        this.products = response;
      } catch(e) {
        console.error('Erreur de la recherche des produits', e);
      }
    },
    async searchProductsByPrice(minPrice, maxPrice) {
      try {
        if (minPrice.value !== null && maxPrice.value !== null && minPrice.value >= 0 && maxPrice.value <= 10000) {
          
        }
      } catch(e) {
        console.error('Erreur de la filtration par prix');
      }
    }
  },
});   