<template>
  <div v-if="!isLoading" class="container h-100">
    <div class="row d-flex align-items-center justify-content-center h-100">
      <div class="col-12 col-sm-12 col-md-8 col-lg-7 col-xl-5">
        <form @submit.prevent="onSubmit" class="bg-white rounded-2 p-3">
          <h3 class="text-decoration-underline text-center fs-4">Ajouter un produit</h3>
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
              <option value="">Choisir une catégorie</option>
              <option value="desktop">Ordinateur</option>
              <option value="gamer">Jeu</option>
              <option value="streaming">Télévision</option>
            </select>
          </div>
          <div class="mb-2">
            <label for="image" class="form-label me-1">Images</label>
            <input @change="changeInputFiles" type="file" ref="inputFiles" multiple>
          </div>
          <SubmitButton>Envoyer</SubmitButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SubmitButton from "@/components/buttons/components/SubmitButton.vue";
import {useProductAdminStore} from "@/stores/admin/productAdminStore";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const isLoading = ref(true)
const inputFiles = ref(null)
const pictures = ref([])

const productAdminStore = useProductAdminStore()
const { editProduct } = storeToRefs(productAdminStore)

onMounted(() => {
  productAdminStore.initProduct()
  isLoading.value = false
})

const router = useRouter()

const onSubmit = async () => {
  await productAdminStore.addProduct(pictures.value)
  await router.push({name: 'admin-product-list'})
}

const changeInputFiles = () => {
  pictures.value = inputFiles.value.files
}
</script>

<style scoped lang="scss">
form {
  textarea {
    height: 120px;
  }
}

</style>