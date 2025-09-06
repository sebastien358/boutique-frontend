import type { ProductInterface } from '@/shared/services/interfaces';
import { axiosFilteredProductsCategory, axiosFilteredProductsPrice, axiosGetProducts, axiosSearchProducts } from '@/shared/services/product.service';
import { defineStore } from 'pinia';

interface StateProduct {
  products: ProductInterface[],
  isLoading: boolean,
  searchTerm: string,
  priceRange: [number, number],
  currentCategory: string,
  offset: number,
  limit: number,
  hasMoreProducts: boolean
}

export const useProductStore = defineStore('products', {
  state: (): StateProduct => ({
    products: [],
    isLoading: true,
    searchTerm: '',
    priceRange: [0, 4000],
    currentCategory: 'all',
    offset: 0,
    limit: 10,
    hasMoreProducts: true,
  }),
  actions: {
    async getProducts(append = false) {
      try {
        this.isLoading = true
        const response = await axiosGetProducts(this.offset = 0, this.limit = 10);
        if (Array.isArray(response)) {
          if (append) {
            this.products = [...this.products, ...response];
          } else {
            this.products = response;
          }
          this.hasMoreProducts = response.length === this.limit;
        } else {
          if (append) {
            this.products = [...this.products, response];
          } else {
            this.products = [response];
          }
          this.hasMoreProducts = false;
        }
      } catch(e) {
        console.error('Erreur de la récupération des produits', e);
      } finally {
        this.isLoading = false
      }
    },
    async loadMoreProduct() {
      try {
        this.offset += this.limit;
        await this.getProducts(true);
        return true;
      } catch(e) {
        console.error('Erreur de la récupération des produits, button (loader)', e);
      }
    },
    async searchProduct(search: string) {
      try {
        const response = await axiosSearchProducts(search);
        if (response) {
          this.products = response;
        } else {
          this.products = [];
        }
      } catch(e) {
        console.error('Erreur search product', e);
      }
    },
    async filteredPrice(priceRange: number[]) {
      try {
        const minPrice = priceRange[0];
        const maxPrice = priceRange[1];
        const response = await axiosFilteredProductsPrice(minPrice, maxPrice);
        response ? this.products = response : this.products = [];
      } catch(e) {
        console.error('Erreur de la filtration des produits par leurs prix', e);
      }
    },
    async filteredCategory(category: string) {
      try {
        const response = await axiosFilteredProductsCategory(category);
        if (category === 'all') {
          await this.getProducts();
        } else {
          response ? this.products = response : this.products = [];
        }
      } catch(e) {
        console.error('Erreur de la filtration des produits par leurs catégoies', e);
      }
    },
  }
});   