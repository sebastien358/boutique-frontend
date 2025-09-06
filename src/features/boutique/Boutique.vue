<script setup lang="ts">
import Shop from './components/shop/Shop.vue';
import { useProductStore } from './stores/productStore';
import { onMounted } from 'vue';

const productStore = useProductStore();

onMounted(async () => {
  try {
    await productStore.getProducts();
  } catch(e) {
    console.error('Erreur de la récupération des produits');
  }
})

async function loadMoreProducts() {
  try {
    await productStore.loadMoreProducts()
  } catch(e) {
    console.log(e);
  }
}
</script>

<template>
  <div>
    <Shop 
      @load-more-products="loadMoreProducts"
      :products="productStore.products" 
      :isLoading="productStore.isLoading"
    />
  </div>
</template>

<style lang="scss" scoped>
</style>