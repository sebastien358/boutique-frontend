<template>
  <div class="shop-product">
    <div v-if="props.product.pictures && props.product.pictures.length > 0">
      <img :src="props.product.pictures[0].url" />
    </div>
    <div v-else>
      <img src="@/assets/images/not-found.webp" />
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
const props = defineProps<{
  product: any
}>()
</script>

<style scoped lang="scss">
.shop-product {
  border: var(--border);
  border-radius: var(--border-radius);
  background-color: white;
  img {
    border-top-right-radius: var(--border-radius);
    border-top-left-radius: var(--border-radius);
    background: white;
    height: 350px;
  }
  &_content {
    padding: 10px;
    p {
      padding: 5px 0;
    }
  }
}
</style>






