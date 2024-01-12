<template>
  <div v-if="!isLoading" class="container">
    <div class="d-flex align-items-center justify-content-center">
      <div class="d-flex align-items-center flex-row mt-4 search">
        <input v-model="productFilter.title" type="search" class="input-search" placeholder="Rechercher">
        <font-awesome-icon @click="filtersProducts" icon="fa-solid fa-magnifying-glass" class="icon" />
      </div>
    </div>

    <nav class="mt-5 mb-3">
      <ul class="list-inline">
        <li v-for="product in products" :key="product.id" class="d-flex align-items-center flex-row border border-1 px-3 py-3 rounded-2 bg-white mb-2">
          <div class="d-flex align-items-center flex-row flex-fill">
            <img v-if="product.pictures[0]" :src="product.pictures[0]" height="45" width="55" class="object-fit-cover rounded-2 me-3">
            <img v-else src="@/assets/images/image-not-found.jpg" height="45" width="55" class="object-fit-cover rounded-2 me-3">
            <h3 class="m-0 fs-6 pe-5">{{product.title}}</h3>
            <p class="m-0">{{product.price}} €</p>
          </div>
          <div class="d-flex align-items-center flex-row">
            <router-link :to="{name: 'admin-product-edit', params: {id: product.id}}">
              <font-awesome-icon icon="fa-solid fa-pen-to-square" class="text-muted icon-2"/>
            </router-link>
            <font-awesome-icon @click="state.open = true" icon="fa-solid fa-trash" class="text-danger ms-2 icon-2" />
            <CalcDeleteProduct
                @delete-product-id="deleteProductId"
                @close="state.open = false"
                :id="product.id"
                :open="state.open"
            />
          </div>
        </li>
      </ul>
    </nav>

    <div class="d-flex align-items-center flex-column justify-content-center mb-3">
      <Button @click="reinitialisation" :buttonReinitialisation2="true">Réinitialisation</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useProductAdminStore} from "@/stores/admin/productAdminStore";
import {storeToRefs} from "pinia";
import {onMounted, reactive, ref} from "vue";
import Button from "@/components/buttons/components/Button.vue";
import CalcDeleteProduct from "@/features/admin/components/CalcDeleteProduct.vue";

const state = reactive<{
  open: boolean
}>({
  open: false
})
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

const reinitialisation = async () => {
  productAdminStore.initFilterProduct()
  await productAdminStore.getProducts()
}

const deleteProductId = async (id: number) => {
  await productAdminStore.deleteProduct(id)
  state.open = false
}
</script>

<style scoped lang="scss">
.container {
  overflow-y: auto;
  height: calc(100vh - 160px);
}

.search {
  border-top: var(--border);
  border-left: var(--border);
  border-bottom: var(--border);
  background-color: var(--text-primary-color);
  border-radius: 6px 0 0 6px;
  padding-left: 4px;
  .input-search {
    border: 0;
    width: 400px;
    outline: none;
  }
  .icon {
    cursor: pointer;
    font-size: 16px;
    background-color: var(--gray-3);
    color: var(--text-primary-color);
    border-radius: 0 6px 6px 0;
    padding: 12px;
    width: 30px;
    border: 2px solid var(--gray-3);
  }
}

.icon-2 {
  cursor: pointer;
}

p {
  font-size: 14px;
}
</style>