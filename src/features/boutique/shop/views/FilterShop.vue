<template>
  <div class="d-flex flex-column pt-3 pb-2 px-2 filterShop z-1">
    <div class="d-flex align-items-center flex-row mb-4 search">
      <input v-model="productsFilters.title" type="search" class="input-search" placeholder="Rechercher">
      <font-awesome-icon @click="onClickFilterTitle" icon="fa-solid fa-magnifying-glass" class="icon" />
    </div>

    <div class="d-flex flex-column mb-4">
      <h3 class="fs-6">Filtrer par prix</h3>
      <div v-for="priceRange in [[0], [500], [1000], [1500], [2000], [2500], [3000], [3500]]">
        <input
            @click="onclickFilterPrice(productsFilters.price = priceRange)"
            :checked="productsFilters.price === priceRange[0]"
            name="priceRange"
            class="mb-2 me-1"
            type="radio"
        >
        <label :for="priceRange[0].toString()">
          {{'plus de ' + priceRange.toString() + '€'}}
        </label>
      </div>
    </div>

    <div class="d-flex flex-column mb-4 flex-fill">
      <h3 class="fs-6">Filtrer par catégorie</h3>
      <div
          v-for="category in ['all', 'streaming', 'gamer', 'desktop']"
          @click="onclickFilterCategory(productsFilters.category = category)"
          class="category" :class="{
            active: productsFilters.category === category
          }"
      >
        {{category}}
      </div>
    </div>

    <div class="d-flex flex-column">
      <small class="mb-1 ms-1">Nombre de produits:
        <small class="text-success">{{products.length}}</small>
      </small>
      <Button @click="reinitialisation" class="bg-danger">Réinitialisation</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/buttons/components/Button.vue";
import {useProductStore} from "@/stores/productStore";
import {storeToRefs} from "pinia";

const productStore = useProductStore()
const { productsFilters, products } = storeToRefs(productStore)

const onClickFilterTitle = async () => {
  await productStore.getProducts()
}

const onclickFilterPrice = async () => {
  await productStore.getProducts()
}

const onclickFilterCategory = async () => {
  await productStore.getProducts()
}

const reinitialisation = async () => {
  productStore.initFiltersProducts()
  await productStore.getProducts()
}
</script>

<style scoped lang="scss">
@use '@/assets/css/mixins' as m;
.filterShop {
  width: 285px;
  border: var(--border);
  background-color: var(--text-primary-color);
  height: calc(100vh - 160px);
  @include m.md {
    position: fixed;
    height: auto;
  }
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
    width: 100%;
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

label {
  font-size: 14px;
}

.category {
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 12px;
  transition: 150ms ease;
  &:hover {
    color: var(--success-1);
    text-decoration: underline;
  }
}

.active {
  color: var(--success-1);
  text-decoration: underline;
}
</style>