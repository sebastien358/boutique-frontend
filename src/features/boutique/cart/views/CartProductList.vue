<template>
  <div>
    <CartProductItem
        v-for="product in cart"
        :key="product.id"
        :product="product"
    />
  </div>
</template>

<script setup lang="ts">
import type {ProductToCartInterface} from "@/interfaces";
import CartProductItem from "@/features/boutique/cart/components/CartProductItem.vue";

defineProps<{
  cart: ProductToCartInterface[]
}>()
</script>

<style scoped lang="scss">
</style>