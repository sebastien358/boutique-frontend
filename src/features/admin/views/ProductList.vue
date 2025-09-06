<template>
  <div class="product-list p-20">
    <div v-for="product in products" :key="product.id" class="card">
      <div v-if="product.pictures && product.pictures.length > 0">
        <div class="d-flex align-items-center">
          <img :src="product.pictures[0].url" />
          <h3>{{ product.title }}</h3>
        </div>
      </div>
      <div v-else>
        <img src="../../../assets/images/not-found.webp" />
      </div>
      <div class="d-flex align-items-center">
        <router-link v-if="product && product.id" :to="{ name: 'edit', params: { id: product.id }}">
          <button class="btn btn-success mr-5">Modifier</button>
        </router-link>
        <button @click="deleteProduct(product.id)" class="btn btn-danger">Supprimer</button>
      </div>
    </div>
    <div class="d-flex align-items-center pagination">
      <button @click="previousPage()" :class="{'btn-pagination': true, 'disabled': currentPage === 1}" :disabled="currentPage === 1">Précédent</button>
      <span>Page {{ currentPage }} - {{ totalPages }}</span>
      <button @click="nextPage()" :class="{'btn-pagination': true, 'disabled': currentPage === totalPages}" :disabled="currentPage === totalPages">Suivant</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useAdminProductStore } from '../stores/productAdminStore';

const productAdminStore = useAdminProductStore();
const products = computed(() => productAdminStore.products);
const currentPage = ref<number>(1);
const itemsPerPage = ref<number>(10);

onMounted(async () => {
  try {
    await productAdminStore.adminGetProducts(currentPage.value, itemsPerPage.value);
  } catch(e) {
    console.error('Erreur de la récupération des produits');
  }
})

async function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
  try {
    await productAdminStore.adminGetProducts(currentPage.value, itemsPerPage.value);
  } catch(e) {
    console.error(e);
  }
}

async function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
  try {
    await productAdminStore.adminGetProducts(currentPage.value, itemsPerPage.value);
  } catch(e) {
    console.error(e);
  }
}

async function deleteProduct(id: number) {
   if (productAdminStore.products.length === 0 && currentPage.value > 1) {
      currentPage.value--;
    }
  try {
    await productAdminStore.deleteProduct(id);
    await productAdminStore.adminGetProducts(currentPage.value, itemsPerPage.value);
  } catch(e) {
    console.error(e);
  }
}

const totalPages = computed(() => 
  Math.ceil(productAdminStore.totalItems / itemsPerPage.value)
);
</script>

<style scoped lang="scss">
.product-list {
  display: grid;
  row-gap: 10px;
}

.card {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  grid-template-rows: auto;
  padding: 10px;
  gap: 40px;

  h3 {
    margin-left: 10px;
  }

  img {
    min-width: 70px;
    min-height: 70px;
    max-width: 70px;
    max-height: 70px;
    border-radius: 50%;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  span {
    font-size: 14px;
  }
}
</style>
