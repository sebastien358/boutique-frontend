<template>
  <div class="d-flex flex-row">
    <Calc @close="state.open = false" :open="state.open && state.isLoading" :transparent="true" />
    <Transition>
    <div v-if="state.open">
      <FilterShop />
    </div>
    </Transition>
    <div class="w-100 mx-3 shop-product">
      <div class="d-flex flex-column justify-content-center mt-2 d-block d-md-none">
        <Button @click="state.open = !state.open">Filtrer les Produits</Button>
      </div>
      <div class="my-3">
        <ShopProductList
            :products="products"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShopProductList from "@/features/boutique/shop/views/ShopProductList.vue";
import {ProductInterface} from "@/interfaces";
import Button from "@/components/buttons/components/Button.vue";
import FilterShop from "@/features/boutique/shop/views/FilterShop.vue";
import {reactive} from "vue";
import Calc from "@/components/calc/components/Calc.vue";

defineProps<{
  products: ProductInterface[]
}>()

const state = reactive<{
  open: boolean,
  isLoading: boolean
}>({
  open: !matchMedia('(max-width: 767.98px)').matches,
  isLoading: matchMedia('(max-width: 767.98px)').matches
})
</script>

<style scoped lang="scss">
.shop-product {
  overflow-y: auto;
  height: calc(100vh - 160px);
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>