<template>
  <div class="product-list p-20">
    <div v-for="product in products" :key="product.id" class="card">
      <div v-if="product.pictures && product.pictures.length > 0">
        <!-- <div v-for="(picture, index) in product.pictures" :key="index" class="d-flex align-items-center"> -->
          <div class="d-flex align-items-center">
            <img :src="product.pictures[0].url" />
            <h3>{{ product.title }}</h3>
          </div>
        <!-- </div> -->
      </div>
      <div v-else>
         <img src="../../../assets//images/not-found.webp" />
      </div>
      <div class="d-flex align-items-center">
        <router-link v-if="product && product.id" :to="{ name: 'edit', params: { id: product.id }}">
          <button class="btn btn-success mr-5">Modifier</button>
        </router-link>
        <button @click="deleteProduct(product.id)" class="btn btn-danger">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAdminProductStore } from '../stores/productAdminStore';

const adminProductStore = useAdminProductStore();

const products = computed(() => adminProductStore.products);

onMounted(async () => {
  await adminProductStore.adminGetProducts()
})

async function deleteProduct(id: string) {
  await adminProductStore.deleteProduct(id);
}
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
</style>