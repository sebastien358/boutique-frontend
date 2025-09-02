<script setup lang="ts">
import ShopProductList from '@/features/boutique/components/shop/ShopProductList.vue'
import ShopFilters from '@/features/boutique/components/shop/ShopFilters.vue'
import Calc from '../../../../components/Calc.vue'
import { reactive } from 'vue';
import type { ProductInterface } from '@/shared/services/interfaces';

defineProps<{
  products: ProductInterface[]
  isLoading: boolean
}>()

const state = reactive<{
  open: boolean
  isMobile: boolean
}>({
  open: !matchMedia('(max-width: 992px)').matches,
  isMobile: matchMedia('(max-width: 992px)').matches
})
</script>

<template>
  <div class="container-shop">
    <Calc :open="state.open && state.isMobile" @close="state.open = false" />
    <div class="shop-filters">
      <Transition>
        <ShopFilters  
          v-if="state.open"
          :products="products"
        /> 
      </Transition>
    </div>
    <div class="d-flex flex-column shop">
      <button @click="state.open = !state.open" class="btn btn-primary">Filtrer les produits</button>
      <ShopProductList 
        :products="products" 
        :isLoading="isLoading"
        class="scrollable"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/mixins';

.container-shop {
  display: grid;
  grid-template-columns: 1fr;
  @include mixins.lg {
    grid-template-columns: 250px 1fr;
  }
  .shop-filters {
    max-width: 300px;
    width: 100%;
    display: fixed;
    @include mixins.lg {
      height: 100%;
    }
  }
  .shop button {
    margin: 10px 10px 0 10px;
    @include mixins.lg {
      display: none;
    }
  }
}

.scrollable {
  padding: 20px;
  overflow-y: auto;
  height: calc(100vh - 96px);
  padding: 10px;
  @include mixins.lg {
    padding: 20px;
  }
}
</style>