<template>
  <div class="card z-0">
    <img v-if="product.pictures[0]" :src="product.pictures[0]" class="card-img-top object-fit-fill h-auto p-2" alt="...">
    <img v-else src="@/assets/images/image-not-found.jpg" class="card-img-top object-fit-cover img-not-found" alt="...">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title text-center text-uppercase fw-semibold m-0 pb-2 flex-fill">{{product.title}}</h5>
      <p class="card-text text-center m-0 flex-fill pb-2">{{product.description}}</p>
      <span class="card-text text-center fw-semibold price">{{product.price}} €</span>
      <hr class="flex-fill">
      <div class="d-flex justify-content-center">
        <router-link :to="{name: 'product-details', params: {id: product.id}}">
          <Button :buttonDetails="true">Détails</Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/buttons/components/Button.vue";
import {ProductInterface} from "@/interfaces";

defineProps<{
  product: ProductInterface
}>()
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
    transition: 400ms ease;
  }
  .card-body {
    .card-title {
      font-size: 16px;
    }
    .card-text {
      font-size: 15px;
    }
    .price {
      font-size: 12px;
    }
  }
}

.active {
  //width: 30rem;
  //height: 30rem
  transform: scale(2);
}
</style>