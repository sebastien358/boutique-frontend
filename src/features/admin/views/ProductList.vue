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
      <button @click="previousPage" :disabled="currentPage === 1" class="btn">Précédent</button>
      <span>Page {{ currentPage }} sur {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="btn">Suivant</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useAdminProductStore } from '../stores/productAdminStore';

const adminProductStore = useAdminProductStore();
const products = computed(() => adminProductStore.products);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);

onMounted(async () => {
  try {
    await adminProductStore.adminGetProducts(currentPage.value, itemsPerPage.value);
    totalItems.value = await adminProductStore.getTotalItems();
  } catch (error) {
    console.error(error);
  }
});

async function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    try {
      await adminProductStore.adminGetProducts(currentPage.value, itemsPerPage.value);
    } catch (error) {
      console.error(error);
    }
  }
}

async function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    try {
      await adminProductStore.adminGetProducts(currentPage.value, itemsPerPage.value);
    } catch (error) {
      console.error(error);
    }
  }
}

async function deleteProduct(id: number) {
  try {
    await adminProductStore.deleteProduct(id);
    // await adminProductStore.adminGetProducts(currentPage.value, itemsPerPage.value);
  } catch (error) {
    console.error(error);
  }
}

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));
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

  button {
    margin: 0 10px;
  }
}
</style>
