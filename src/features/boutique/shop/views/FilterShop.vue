<template>
  <div class="d-flex flex-column pt-3 pb-2 px-2 filterShop z-1">
    <div class="d-flex align-items-center flex-row mb-4 search">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="icon me-1" />
      <input v-model="productsFilters.title" type="search" placeholder="Rechercher">
      <Button @click="onClickFilterTitle" class="btn-search">Go</Button>
    </div>

    <div class="d-flex flex-column mb-4">
      <h3 class="fs-6">Filtrer par prix</h3>
      <div v-for="priceRange in [[0, 500], [500, 1000], [1000, 1500], [1500, 2000], [2000, 2500], [2500, 3000], [3000, 3500]]">
        <input
            @click="onclickFilterPrice(productsFilters.price = priceRange)"
            type="radio"
            name="priceRange"
            :id="priceRange[0].toString()"
            :checked="priceRange[0] === productsFilters.price"
            class="mb-2 me-1"
        >
        <label :for="priceRange[0].toString()">
          {{priceRange[0] === 0 ? 'Tous les produits' : priceRange[1] === 3500 ?
                'Plus de 3000' : `Entre ${priceRange[0]} et ${priceRange[1]}` }}
        </label>
      </div>
    </div>

    <div class="d-flex flex-column mb-4 flex-fill">
      <h3 class="fs-6">Filtrer par catégorie</h3>
      <div
          v-for="category in ['all', 'streaming', 'gamer', 'desktop']"
          @click="onclickFilterCategory(productsFilters.category = category)"
          class="category" :class="{active: productsFilters.category === category}"
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
const { products } = storeToRefs(productStore)
const { productsFilters } = storeToRefs(productStore)

const onClickFilterTitle = async () => {
  await productStore.getProducts()
}

const onclickFilterPrice = async () => {
  await productStore.getProducts()
}

const onclickFilterCategory = async (category) => {
  if (category === 'all') {
    productStore.initFiltersProducts()
    await productStore.getProducts()
  }
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
  .search {
    border: var(--border);
    border-radius: 6px;
    background-color: var(--text-primary-color);
    padding: 6px;
    input {
      border: 0;
      outline: none;
    }
    .btn-search {
      position: relative;
      right: 27px;
      font-size: 12px;
    }
    .icon {
      font-size: 15px;
    }
  }
  label {
    font-size: 14px;
  }
  .category {
    cursor: pointer;
    font-size: 14px;
    margin-bottom: 6px;
    transition: 150ms ease;
    &:hover {
      color: var(--success-1);
      text-decoration: underline;
    }
  }
}

.active {
  color: var(--success-1);
  text-decoration: underline;
}
</style>