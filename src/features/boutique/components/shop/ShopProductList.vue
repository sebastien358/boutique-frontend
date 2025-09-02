<template>
  <div v-if="!isLoading">
    <div class="shop-product-list">
      <ShopProduct 
        v-for="product in products" :key="product.id"
        :product="product"
      />
    </div>
  </div>
  <div v-else class="d-flex justify-content-center align-items-center spinner">
    <span class="loader"></span>
  </div>
</template>

<script setup lang="ts">
import ShopProduct from '@/features/boutique/components/shop/ShopProduct.vue'
import { useProductStore } from '../../stores/productStore';

const productStore = useProductStore();

defineProps<{
  products: Array
  isLoading: boolean
}>()
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixins';

.shop-product-list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: 420px;
  gap: 10px;
  @include mixins.sm {
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
  }
  @include mixins.md {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  @include mixins.lg {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  @include mixins.xl {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  @include mixins.xxl {
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
  }
}


</style>