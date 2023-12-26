<template>
  <nav>
    <ul class="list-inline m-0 mb-2">
      <li class="d-flex align-items-center flex-row mb-2 cart-product-item">
        <div class="d-flex align-items-center flex-row flex-fill">
          <p class="m-0 pe-5">{{product.title}}</p>
          <small>{{product.price}}€</small>
        </div>
        <div class="d-flex align-items-center">
          <small class="me-3">x {{product.quantity}}</small>
          <font-awesome-icon icon="fa-solid fa-trash" class="text-danger" />
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import {ProductToCartInterface} from "@/interfaces";

defineProps<{
  product: ProductToCartInterface
}>()
</script>

<style scoped lang="scss">
.cart-product-item {
  border: var(--border);
  padding: 15px 10px;
  border-radius: 6px;
}
</style>