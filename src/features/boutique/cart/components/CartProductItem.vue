<template>
  <nav>
    <ul class="list-inline m-0 mb-2">
      <li class="d-flex align-items-center flex-row mb-2 cart-product-item">
        <div class="d-flex align-items-center flex-row flex-fill">
          <small class="m-0 pe-5">{{product.title}}</small>
          <small>{{product.price}}€</small>
        </div>
        <div class="d-flex align-items-center">
          <small class="me-3">x {{product.quantity}}</small>
          <font-awesome-icon @click="onClickDeleteProductToCart(product.id as number)" icon="fa-solid fa-trash" class="text-danger icon" />
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import {ProductToCartInterface} from "@/interfaces";
import {useProductStore} from "@/stores/productStore";

defineProps<{
  product: ProductToCartInterface
}>()

const productStore = useProductStore()

const onClickDeleteProductToCart = (id: number) => {
  productStore.deleteProductToCart(id)
}
</script>

<style scoped lang="scss">
.cart-product-item {
  border: var(--border);
  padding: 15px 10px;
  border-radius: 6px;
  .icon {
    cursor: pointer;
  }
}
</style>