<template>
  <div class="d-flex flex-column cart-fixed z-2">
    <Calc @close="state.open = false" :open="state.open" :transparent="false" />
    <Transition mode="out-in">
    <div v-if="!state.open" @click="state.open = !state.open" class="d-flex align-items-center justify-content-center logo-cart">
      <div class="d-flex justify-content-center align-items-center info-logo">{{cart.length}}</div>
      <font-awesome-icon icon="fa-solid fa-message" class="icon" />
    </div>
    <div v-else>
      <div v-if="state.open" class="d-flex flex-column cart-product">
        <h3>Panier</h3>
        <span v-if="!cart.length" class="text-danger mb-3 basket">Rien dans le panier...</span>
        <CartProductList
            :cart="cart"
        />
        <Button class="btn">Commander ({{ productStore.totalPrice() }}) €</Button>
      </div>
    </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type {ProductToCartInterface} from "@/interfaces";
import CartProductList from "@/features/boutique/cart/views/CartProductList.vue";
import Button from "@/components/buttons/components/Button.vue";
import {reactive} from "vue";
import {useProductStore} from "@/stores/productStore";
import Calc from "@/components/calc/components/Calc.vue";

const state = reactive<{
  open: boolean
}>({
  open: false
})

defineProps<{
  cart: ProductToCartInterface[]
}>()

const productStore = useProductStore()
</script>

<style scoped lang="scss">
.cart-fixed {
  position: fixed;
  right: 20px;
  bottom: 65px;
}

.logo-cart {
  cursor: pointer;
  position: relative;
   width: 65px;
   height: 65px;
   border-radius: 50%;
   background-color: var(--primary-1);
  .info-logo {
    position: absolute;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background-color: var(--danger-1);
    font-size: 8px;
    color: var(--text-primary-color);
    top: 4px;
    right: 3px;
  }
  .icon {
    color: var(--text-primary-color);
  }
 }

.cart-product {
  background-color: var(--text-primary-color);
  border: var(--border);
  padding: 8px;
  width: 450px;
  .basket {
    font-size: 12px;
    position: relative;
    left: 1px;
  }
  h3 {
    font-size: 22px;
  }
  .btn {
    background-color: var(--success-1);
  }
  span {
    font-weight: 500;
    font-size: 13px;
  }
}

/* we will explain what these classes do next! */

.v-enter-active,
.v-leave-active {
  transition: 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(15px);
  opacity: 0;
}
</style>