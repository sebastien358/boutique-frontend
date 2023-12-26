<template>
  <BaseTemplate>
    <div class="#">
      <div class="#">
        <CartProduct
            :cart="cart"
        />
        <ShopProduct
            :products="products"
        />
      </div>
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