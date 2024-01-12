<template>
  <div class="d-flex flex-column cart-fixed z-2">
    <CartBasketItem
        :cart="cart"
    />
  </div>
</template>

<script setup lang="ts">
import type {ProductToCartInterface} from "@/interfaces";
import CartBasketItem from "@/features/boutique/cart/components/CartBasketItem.vue";

defineProps<{
  cart: ProductToCartInterface[]
}>()
</script>

<style scoped lang="scss">
@use '@/assets/css/mixins' as m;
.cart-fixed {
  position: fixed;
  right: 20px;
  bottom: 65px;
  @include m.sm {
    right: 10px;
  }
}
</style>