<template>
  <div class="card">
    <img :src="product.pictures[0]" class="card-img-top object-fit-fill" alt="..." height="300">
    <div class="card-body">
      <h5 class="card-title text-uppercase fw-semibold m-0 pb-3">{{product.title}}</h5>
      <p class="card-text m-0 pb-3">{{product.description}}</p>
      <div class="d-flex align-items-center justify-content-between">
        <span class="card-text price">{{product.price}} €</span>
        <Button @click="onClickProductId(product.id)">Ajouter au panier</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/buttons/components/Button.vue";
import {ProductInterface} from "@/interfaces";
import {useProductStore} from "@/stores/productStore";

defineProps<{
  product: ProductInterface
}>()

const productStore = useProductStore()

const onClickProductId = (id) => {
  productStore.addProductToCart(id)
}
</script>

<style scoped lang="scss">
@use '@/assets/css/mixins' as m;
.card {
  width: 23rem;
  @include m.sm {
    width: 100%;
  }
  .card-body {
    .card-title {
      font-size: 17px;
    }
    .card-text {
      font-size: 15px;
    }
  }
}
</style>