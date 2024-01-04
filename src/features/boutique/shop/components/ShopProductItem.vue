<template>
  <div class="card z-0">
    <img v-if="product.pictures[0]" :src="product.pictures[0]" class="card-img-top object-fit-fill h-auto p-2" alt="...">
    <img v-else src="@/assets/images/image-not-found.jpg" class="card-img-top object-fit-cover img-not-found" alt="...">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title text-center text-uppercase fw-semibold m-0 pb-2 flex-fill">{{product.title}}</h5>
      <p class="card-text text-center m-0 flex-fill">{{product.description}}</p>
      <hr class="flex-fill">
      <div class="d-flex align-items-center justify-content-between fw-semibold">
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

const onClickProductId = (id: number) => {
  productStore.addProductToCart(id)
}
</script>

<style scoped lang="scss">
@use '@/assets/css/mixins' as m;
.card {
  width: 22rem;
  @include m.sm {
    width: 100%;
  }
  .img-not-found {
    height: 220px;
  }
  .card-body {
    .card-title {
      font-size: 16px;
    }
    .card-text {
      font-size: 15px;
    }
    .price {
      font-weight: 700;
      font-size: 12px;
    }
  }
}
</style>