import type { FiltersInterface } from "@/shared/services/interfaces";

export const DEFAULT_FILTERS: FiltersInterface = {
  search: '',
  priceRange: [0, 10000],
  category: 'all'
}