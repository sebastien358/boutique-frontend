import type { ProductInterface } from '@/shared/services/interfaces';
import { axiosgetFilteredProductCategory, axiosgetFilteredProductPrice, axiosGetProducts, axiosSearchProducts } from '@/shared/services/product.service';
import { defineStore } from 'pinia';

interface StateProduct {
  products: ProductInterface[],
  isLoading: boolean,
  searchTerm: string,
  priceRange: [number, number],
  currentCategory: string
}

export const useProductStore = defineStore('products', {
  state: (): StateProduct => ({
    products: [],
    isLoading: true,
    searchTerm: '',
    priceRange: [0, 4000],
    currentCategory: 'all'
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
    async searchProducts(searchTerm: string) {
      try {
        const response = await axiosSearchProducts(searchTerm);
        response ? this.products = response : this.products = [];
      } catch(e) {
        console.error('Erreur search products', e);
      }
    },
    async filteredProductPrice(priceRange: number[]) {
      try {
        const minPrice = priceRange[0];
        const maxPrice = priceRange[1];
        const response = await axiosgetFilteredProductPrice(minPrice, maxPrice) 
        response ? this.products = response : this.products = [];
      } catch(e) {
        console.error('Erreur de la filtration des produits selon le prix', e);
      }
    },
    async filteredProductCategory(category: string) {
      try {
        if (category === 'all') {
          const response = await axiosGetProducts();
          this.products = response
        } else {
          const response = await axiosgetFilteredProductCategory(category);
          response ? this.products = response : this.products = [];
        }
      } catch(e) {
        console.error('Erreur de la filtration des produits selon la catégorie', e);
      }
    }
  }
});   