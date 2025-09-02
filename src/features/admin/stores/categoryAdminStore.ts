import { axiosAdmingetCategories } from '@/shared/services/category.service'
import type { CategoryInterface } from '@/shared/services/interfaces';
import { defineStore } from 'pinia'

interface StateAdminCategory {
  categories: CategoryInterface[],
  loading: boolean,
  error: null
}

export const useAdminCategoryStore = defineStore('category', {
  state: (): StateAdminCategory => ({
    categories: [],
    loading: false,
    error: null
  }),
  actions: {
    async adminCategories() {
      try {
        this.loading = true;
        const response = await axiosAdmingetCategories();
        this.categories = response;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
})