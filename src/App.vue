<template>
  <router-view v-slot="{Component}">
    <Component :is="Component" />
  </router-view>
</template>

<script setup lang="ts">
import {useProductStore} from "@/stores/productStore";
import {onMounted} from "vue";

const productStore = useProductStore()

const displayProducts = async () => {
  await productStore.getProducts()
}

onMounted(async () => {
  await displayProducts()
})
</script>

<style scoped lang="scss">
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 200ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
