<template>
  <div class="d-flex flex-column space-between shop-filters"> 
    <div class="d-flex flex-column">
      <div class="d-flex flex-column shop-filters_search">
        <h3 class="mb-5">Rechercher</h3>
        <input @input="filteredProductBySearch()" v-model="productStore.searchTerm" type="text" placeholder="Rechercher" />
      </div>
      <div class="d-flex flex-column">
        <h4 class="mb-10">Filter par prix</h4>
        <div 
          v-for="(priceRange, index) in [[0, 4000], [500, 1000], [1000, 1500], [2000, 4000]]" 
          :key="index" 
          class="shop-filters_price"
          >
          <input 
            @click="filteredProductByPrice(priceRange)" 
            v-model="productStore.priceRange"
            :checked="productStore.priceRange[0] === priceRange[0] && productStore.priceRange[1] === priceRange[1]" 
            :value="priceRange" 
            name="priceRange" 
            type="radio" 
            class="mb-15 mr-5" 
          />
          <span>
            {{
              priceRange[0] === 0 ? 
              'Tous les produits' : priceRange[0] === 2000 ? 
              'Plus de 2000' : `Entre ${priceRange[0]} et ${priceRange[1]}`
            }}
          </span>
        </div>
        <div class="d-flex flex-column shop-filters_category">
          <h4 class="mb-10">Filtrer par catégorie</h4>
          <p 
            v-for="(category, index) in ['all', 'streaming', 'gamer', 'desktop']" 
            :key="index" :value="category" 
            name="category" 
            class="mb-15 category"
          >
          <span 
            @click="filteredProductByCategory(category)" 
            :class="{'active-category' : productStore.currentCategory.includes(category)}"
            >
            {{ category }}
          </span>
          </p>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column shop-filters_initialisation">
      <small class="mb-5">Nombre de produit : <span class="products-length">{{ products.length }}</span></small>
      <button @click="initFilteredProducts()" class="btn btn-danger">Réinitialisation</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductInterface } from '@/shared/services/interfaces';
import { useProductStore } from '../../stores/productStore';

defineProps<{
  products: ProductInterface[]
}>()

const productStore = useProductStore();

// Filtration des produits : SEARCH

async function filteredProductBySearch() {
  try {
    await productStore.searchProduct(productStore.searchTerm);
  } catch(e) {
    console.error(e);
  }
}

// Filtration des produits : PRIX

async function filteredProductByPrice(priceRange: number[]) {
  try {
    await productStore.filteredPrice(priceRange);
  } catch(e) {
    console.error(e);
  }
}

// Filtration des produits : CATÉGORIES

async function filteredProductByCategory(category: string) {
  try {
    await productStore.filteredCategory(category);
    productStore.currentCategory = category;
  } catch(e) {
    console.error(e);
  }
}

// Initialisation des produits

function initFilteredProducts() {
  productStore.getProducts(false);
  productStore.searchTerm = '';
  productStore.priceRange = [0, 4000];
  productStore.currentCategory = 'all';
  productStore.offset = 0;
}
</script>

<style scoped lang=scss>
@use '@/assets/scss/mixins';

.shop-filters {
  z-index: 1;
  padding: 20px 10px 7px 10px;
  background-color: #00000091;
  height: 550px;
  position: fixed;
  @include mixins.lg {
    border-right: var(--border);
    background-color: var(--gray-1);
    position: relative;
    height: auto;
  }
  &_search {
    margin-bottom: 30px;
    @include mixins.lg {
      margin-bottom: 20px;
    }
    h3 {
    font-size: 17px;
    color: var(--text-primary-color);
      @include mixins.lg {
        color: var(--gray-3);
      }
    }
  }
  &_price {
    span {
      font-size: 15px;
      color: var(--text-primary-color);
      @include mixins.lg {
        color: var(--gray-3);
      }
    }
  }
  &_category {
    margin-top: 20px;
    @include mixins.lg {
      margin-top: 10px;
    }
    span {
      color: var(--text-primary-color);
      @include mixins.lg {
        color: var(--gray-3);
      }
      font-size: 15px;
    }
  }
  &_initialisation {
    color: var(--text-primary-color);
    @include mixins.lg {
      color: var(--gray-3);
    }
    font-size: 15px;
  }
}

h4 {
  color: var(--text-primary-color);
  @include mixins.lg {
    color: var(--gray-3);
  }
}

.products-length {
  color: var(--success-1);
  font-weight: 500;
}

.category {
  cursor: pointer;
  .active-category {
  color: var(--success-1);
  }
}
</style>