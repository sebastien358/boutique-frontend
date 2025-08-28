<template>
  <div class="d-flex flex-column space-between shop-filters"> 
    <div class="d-flex flex-column">
      <div class="mb-20">
        <h3 class="mb-5">Rechercher</h3>
        <input @input="searchProduct" v-model="productStore.searchTerm" placeholder="Rechercher" type="text" />
      </div>

      <div class="d-flex flex-column">
         <h4 class="mb-5">Filter par prix</h4>
        <vue-slider v-model="priceRange" :min="0" :max="1000" :interval="10" />
        <p>Prix : {{ priceRange[0] }} - {{ priceRange[1] }}</p>
      </div>
    </div>
 
    <div class="d-flex flex-column">
      <small class="mb-5">Nombre de produit : <span class="products-length">{{ products.length }}</span></small>
      <button @click="initProducts" class="btn btn-danger">Réinitialisation</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// import VueSlider from 'vue-slider-component'
import { useProductStore } from '../../stores/productStore';

defineProps<{
  products: Array
}>()

const productStore = useProductStore();

async function searchProduct() {
  await productStore.searchProduct(productStore.searchTerm)
} 

function initProducts() {
  productStore.getProducts(false);
  productStore.searchTerm = '';
}

const priceRange = ref([0, 3500]);

watch(priceRange, () => {
  productStore.searchProductsByPrice(priceRange.value[0], priceRange.value[1])
})

</script>

<style scoped lang=scss>
.shop-filters {
  padding: 20px 10px 7px 10px;
  height: 100%;
  border-right: var(--border);
  h3 {
    font-size: 16px;
  }
}

.products-length {
  color: var(--success-1);
  font-weight: 500;
}
</style>