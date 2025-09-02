<template>
    <div class="shop-product">
      <div class="d-flex flex-column">
        <div v-if="props.product.pictures && props.product.pictures.length > 0">
          <img :src="props.product.pictures[0].url" />
        </div>
        <div v-else>
          <img src="@/assets/images/not-found.webp" />
        </div>
      </div>
      <div class="d-flex flex-column shop-product_content">
        <h3>{{ props.product.title }}</h3>
        <p>{{ props.product.description }}</p>
        <div class="d-flex align-items-center space-between">
          <strong>Prix : {{ props.product.price }} €</strong>
          <button class="btn btn-primary">Ajouter au panier</button>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import type { ProductInterface } from '@/shared/services/interfaces';

const props = defineProps<{
  product: ProductInterface
}>()
</script>

<style scoped lang="scss">
.shop-product {
  border-radius: var(--border-radius);
  background-color: white;
  overflow: hidden;
  border: var(--border);
  img {
    border-top-right-radius: var(--border-radius);
    border-top-left-radius: var(--border-radius);
    border-bottom: var(--border);
    background: white;
    height: 300px;
  }
  &_content {
    padding: 10px;
    height: 200px;
    p {
      padding: 5px 0;
    }
  }
}
</style>






