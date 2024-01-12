<template>
  <BaseTemplate>
    <div v-if="!isLoading" class="container pt-3">
      <div class="row">
        <div class="d-flex justify-content-center" :class="{active: state.toggleImageStyle}">
          <img @click="state.toggleImageStyle = !state.toggleImageStyle" v-if="editProduct.pictures[0]" :src="editProduct.pictures[0].url" class="img" :class="{
          active: state.toggleImageStyle
        }">
        </div>

        <div :class="{bodyPage: state.toggleImageStyle}">
          <div class="d-flex justify-content-center mt-4">
            <div class="d-flex flex-column align-items-center justify-content-center p-3 bg-white w-50">
              <h1>{{editProduct.title}}</h1>
              <p>{{editProduct.description}}</p>
              <p>{{editProduct.price}}€</p>
            </div>
          </div>
          <div class="d-flex justify-content-center mt-3">
            <Button>Ajouter au panier</Button>
          </div>
        </div>
      </div>

    </div>
  </BaseTemplate>
</template>

<script setup lang="ts">
import BaseTemplate from "@/BaseTemplate.vue";
import {useProductStore} from "@/stores/productStore";
import {storeToRefs} from "pinia";
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import Button from "@/components/buttons/components/Button.vue";
import CartBasketItem from "@/features/boutique/cart/components/CartBasketItem.vue";
import {ProductToCartInterface} from "@/interfaces";

const state = reactive<{
  toggleImageStyle: boolean
}>({
  toggleImageStyle: false,
})

defineProps<{
  cart: ProductToCartInterface[]
}>()

const isLoading = ref(true)

const productStore = useProductStore()
const { editProduct } = storeToRefs(productStore)

const route = useRoute()

onMounted(async () => {
  await productStore.getProductItem(route.params.id)
  isLoading.value = false
})
</script>

<style scoped lang="scss">
.img {
  height: 220px;
}

.active {
  display: block;
  margin: 100px auto;
  animation: animateImages 600ms ease-out forwards;
  //position: relative;
}

@keyframes animateImages {
  0% {
    opacity: 0;
    transform: scale(0);
    //transition: all 300ms ease;
  }
  100% {
    opacity: 1;
    transform: scale(1.5);
    //transition: all 200ms ease;
  }
}

.bodyPage {
  display: none;
}
</style>