<template>
  <div v-if="!isLoading" class="container product-edit">
    <div class="row d-flex justify-content-center mt-4 mb-5">
      <div class="col-12 col-sm-12 col-md-8 col-lg-7 col-xl-5">
        <form @submit.prevent="onSubmit" class="bg-white rounded-2 p-3">
          <h3 class="text-decoration-underline text-center fs-4">Modifier un produit</h3>
          <div class="mb-3">
            <label for="title" class="form-label">Titre</label>
            <input v-model="editProduct.title" type="text" class="form-control" aria-describedby="emailHelp" required>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea v-model="editProduct.description" class="form-control" required></textarea>
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">Prix</label>
            <input v-model="editProduct.price" type="number" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="category" class="form-label">Catégories</label>
            <select v-model="editProduct.category" class="form-select" aria-label="Default select example">
              <option selected>Choisir une catégorie</option>
              <option value="desktop">Ordinateur</option>
              <option value="gamer">Jeu</option>
              <option value="streaming">Télévision</option>
            </select>
          </div>
          <div class="mb-2">
            <label for="image" class="form-label me-1">Images</label>
            <input @change="changeInputFiles" type="file" ref="inputFiles" multiple>
          </div>
          <SubmitButton>Modifier</SubmitButton>
        </form>
      </div>
    </div>

    <div class="d-flex flex-wrap justify-content-center mb-4 container-images">
      <div v-for="picture in editProduct.pictures" class="position-relative">
        <img :src="picture.url" class="picture-edit">
        <font-awesome-icon @click="deletePicture(picture.id)" icon="fa-solid fa-trash" class="text-danger icon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SubmitButton from "@/components/buttons/components/SubmitButton.vue";
import {useProductAdminStore} from "@/stores/admin/productAdminStore";
import {storeToRefs} from "pinia";
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import Button from "@/components/buttons/components/Button.vue";

const isLoading = ref(true)

const inputFiles = ref(null)
const pictures = ref([])

const productAdminStore = useProductAdminStore()
const { editProduct } = storeToRefs(productAdminStore)

const route = useRoute()

onMounted( async () => {
  await productAdminStore.getProductItem(route.params.id)
  isLoading.value = false
})

const onSubmit = async () => {
  await productAdminStore.updateProduct(pictures.value)
}

const changeInputFiles = () => {
  pictures.value = inputFiles.value.files
}

const deletePicture = async (id) => {
  await productAdminStore.deletePicture(id)
}
</script>

<style scoped lang="scss">
@use '@/assets/css/mixins'as m;
.product-edit {
  overflow-y: auto;
  height: calc(100vh - 160px);
  .container-images {
    gap: 15px;
    .picture-edit {
      width: 450px;
      height: auto;
      object-fit: cover;
      @include m.md {
        width: 100%;
      }
    }
    .icon {
      position: absolute;
      top: 13px;
      right: 10px;
      font-size: 17px;
      cursor: pointer;
    }
  }
}
</style>