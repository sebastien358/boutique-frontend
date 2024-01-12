<template>
  <BaseTemplate>
    <div v-if="!isLoading" class="container pt-3">
      <div class="row">
        <div class="d-flex justify-content-center" :class="{active: state.toggleImageStyle}">
          <div @click="state.toggleImageStyle = !state.toggleImageStyle">
            <img v-if="editProduct.pictures[0]" :src="editProduct.pictures[0].url" title="Cliquer pour agrandir" class="img" :class="{
              active: state.toggleImageStyle
            }">
            <img v-else src="@/assets/images/image-not-found.jpg">
          </div>
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
            <Button @click="onClickAddProductToCart(editProduct.id)" :buttonAddBasket="true">Ajouter au panier</Button>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column cart-fixed z-2">
      <CartBasketItem
          :cart="cart"
      />
    </div>
  </BaseTemplate>
</template>

<script setup lang="ts">
import BaseTemplate from "@/BaseTemplate.vue";
import {useProductStore} from "@/stores/productStore";
import {storeToRefs} from "pinia";
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {ProductToCartInterface} from "@/interfaces";
import Button from "@/components/buttons/components/Button.vue";
import CartBasketItem from "@/features/boutique/cart/components/CartBasketItem.vue";

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
const { editProduct, cart } = storeToRefs(productStore)

const route = useRoute()

onMounted(async () => {
  await productStore.getProductItem(route.params.id)
  isLoading.value = false
})

const onClickAddProductToCart = (id: number) => {
  productStore.addProductToCart(id)
}
</script>

<style scoped lang="scss">
@use '@/assets/css/mixins' as m;

.img {
  cursor: pointer;
  height: 220px;
}

.active {
  display: block;
  margin: 150px auto;
  animation: animateImages 600ms ease-out forwards;
}

@keyframes animateImages {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1.6);
  }
}

.bodyPage {
  display: none;
}

.cart-fixed {
  position: fixed;
  right: 20px;
  bottom: 65px;
  @include m.sm {
    right: 10px;
  }
}
</style>