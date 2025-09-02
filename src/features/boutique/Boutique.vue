<script setup lang="ts">
import Shop from './components/shop/Shop.vue';
import { useProductStore } from './stores/productStore';
import { onMounted } from 'vue';

const productStore = useProductStore();

onMounted(async () => {
  await productStore.getProducts();
})
</script>

<template>
  <div>
    <Shop 
      :products="productStore.products" 
      :isLoading="productStore.isLoading"
    />
  </div>
</template>

<style lang="scss" scoped>
</style>