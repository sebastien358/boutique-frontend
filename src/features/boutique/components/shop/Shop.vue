<script setup lang="ts">
import ShopProductList from '@/features/boutique/components/shop/ShopProductList.vue'
import ShopFilters from '@/features/boutique/components/shop/ShopFilters.vue'
import type { FilterUpdate } from '@/shared/services/interfaces';

defineProps<{
  products: Array
}>()
</script>

<template>
  <div class="shop">
    <ShopFilters  
      :products="products"
    />
    <ShopProductList 
      :products="products" 
      class="scrollable"

    />
  </div>
</template>

<style lang="scss" scoped>
.shop {
  display: grid;
  grid-template-columns: auto 1fr;
}

.scrollable {
  padding: 20px;
  overflow-y: auto;
  height: calc(100vh - 96px);
}
</style>