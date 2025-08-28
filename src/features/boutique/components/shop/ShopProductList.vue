<script setup lang="ts">
import ShopProduct from '@/features/boutique/components/shop/ShopProduct.vue'

defineProps<{
  products: Array
}>()
</script>

<template>
  <div class="shop-product-list">
    <ShopProduct 
      v-for="product in products" :key="product.id"
      :product="product"
    />
  </div>
</template>

<style lang="scss" scoped>
.shop-product-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 470px;
  gap: 15px;
}
</style>