<template>
  <div v-if="!isLoading" class="container">
    <div class="d-flex align-items-center justify-content-center mt-3">
      <div class="d-flex align-items-center flex-row search">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="icon" />
        <input v-model="productFilter.title" type="search" class="ms-2">
        <Button @click="filtersProducts" class="p-1">Search</Button>
      </div>
    </div>
    <nav class="my-3">
      <ul class="list-inline">
        <li v-for="product in products" :key="product.id" class="d-flex align-items-center flex-row border border-1 px-3 py-2 rounded-2 bg-white mb-3">
          <div class="d-flex align-items-center flex-row flex-fill">
            <img v-if="product.pictures[0]" :src="product.pictures[0]" height="60" width="90" class="object-fit-cover rounded-2 me-3">
            <img v-else src="@/assets/images/image-not-found.jpg" height="60" width="90" class="object-fit-cover rounded-2 me-2">
            <h3 class="m-0 fs-6 pe-5">{{product.title}}</h3>
            <p class="m-0">{{product.price}} €</p>
          </div>
          <div class="d-flex align-items-center flex-row">
            <router-link :to="{name: 'admin-product-edit', params: {id: product.id}}">
              <font-awesome-icon icon="fa-solid fa-pen-to-square" class="text-muted icon"/>
            </router-link>
            <font-awesome-icon @click="deleteProduct(product.id)" icon="fa-solid fa-trash" class="text-danger icon" />
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import {useProductAdminStore} from "@/stores/admin/productAdminStore";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import Button from "@/components/buttons/components/Button.vue";

const isLoading = ref(true)

const productAdminStore = useProductAdminStore()
const { products } = storeToRefs(productAdminStore)
const { productFilter} = storeToRefs(productAdminStore)

onMounted(async () => {
  await productAdminStore.getProducts()
  isLoading.value = false
})

const filtersProducts = async () => {
  await productAdminStore.getProducts()
}

const deleteProduct = async (id) => {
  await productAdminStore.deleteProduct(id)
}
</script>

<style scoped lang="scss">
.container {
  overflow-y: auto;
  height: calc(100vh - 160px);
}
p {
  font-size: 14px;
}

.icon {
  cursor: pointer;
  font-size: 17px;
  margin: 0 4px;
}

.search {
  border: var(--border);
  border-radius: 6px;
  background-color: var(--text-primary-color);
  padding: 10px;
  input {
    width: 300px;
    border: 0;
    outline: none;
  }
  .icon {
    font-size: 18px;
  }
}

.btn {
  padding: 13px;
  margin-left: 3px;
}
</style>