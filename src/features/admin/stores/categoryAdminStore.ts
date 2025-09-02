import { axiosAdmingetCategories } from '@/shared/services/category.service'
import { defineStore } from 'pinia'

export const useAdminCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    loading: false,
    error: null
  }),
  actions: {
    async adminCategories() {
      this.loading = true
      try {
        const response = await axiosAdmingetCategories()
        this.categories = response;
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})