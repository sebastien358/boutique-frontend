<template>
  <BaseTemplate>
    <div>
      <CartProduct
          :cart="cart"
      />
      <ShopProduct
          :products="products"
      />
    </div>
  </BaseTemplate>
</template>

<script setup lang="ts">
import BaseTemplate from "@/BaseTemplate.vue";
import {useProductStore} from "@/stores/productStore";
import {storeToRefs} from "pinia";
import CartProduct from "@/features/boutique/cart/views/CartProduct.vue";
import ShopProduct from "@/features/boutique/shop/views/ShopProduct.vue";

const productStore = useProductStore()
const { products } = storeToRefs(productStore)
const { cart } = storeToRefs(productStore)
</script>

<style scoped lang="scss">
</style>