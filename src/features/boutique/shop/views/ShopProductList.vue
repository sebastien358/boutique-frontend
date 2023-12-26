<template>
  <div class="d-flex flex-wrap justify-content-center shop-product-list">
    <ShopProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
    />
  </div>
</template>

<script setup lang="ts">
import ShopProductItem from "@/features/boutique/shop/components/ShopProductItem.vue";
import type {ProductInterface} from "@/interfaces";

defineProps<{
  products: ProductInterface[]
}>()
</script>

<style scoped lang="scss">
.shop-product-list {
  gap: 12px;
}
</style>