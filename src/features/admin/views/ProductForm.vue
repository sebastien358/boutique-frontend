<template>
  <div class="d-flex flex-column justify-content-center align-items-center product-form p-20">
    <div class="container-form card">
      <h3 class="mb-20">{{ product ? 'Modifier' : 'Ajouter un produit' }}</h3>
      <form @submit.prevent="onSubmit">
        <div class="d-flex flex-column mb-20">
          <label for="name">*Nom du produit</label>
          <input type="text" name="title" v-model="title" />
          <span v-if="errorTitle" class="form-error">{{ errorTitle }}</span>
        </div>
        <div class="d-flex flex-column mb-20">
          <label for="name">*Prix</label>
          <input type="number" name="price" v-model="price" />
          <span v-if="errorPrice" class="form-error">{{ errorPrice }}</span>
        </div>
        <div class="d-flex flex-column mb-20">
          <label for="description">*Description du produit</label>
          <textarea name="description" rows="5" v-model="description"></textarea>
          <span v-if="errorDescription" class="form-error">{{ errorDescription }}</span>
        </div>
          <div class="d-flex flex-column mb-10">
          <label for="image">*Image</label>
          <input type="file" multiple @change="onChangeImage($event.target.files)" />
          <span v-if="errorImage" class="form-error">{{ errorImage }}</span>
        </div>
        <div class="text-center mb-10">
          <span v-if="successMessage" class="success-message">{{ successMessage }}</span>
          <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
        </div>
        <button class="btn btn-primary" :disabled="isSubmitting ">Soumettre</button>
      </form>
    </div>
    <div v-for="(picture, index) in product.pictures" :key="index" class="container-images">
      <div class="d-flex flex-column align-items-center">
         <img :src="picture.filename" alt="Image du produit" class="img"/>
        <button class="btn btn-danger" @click="deleteImage(product.id, picture.id)">Supprimer</button>
      </div>
     
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useAdminProductStore } from '../stores/productAdminStore';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const productAdminStore = useAdminProductStore();

const router = useRouter();
const route = useRoute();

const product = ref('');

if (route.params.id) {
  product.value = await productAdminStore.getProductId(route.params.id)
}

async function deleteImage(productId: string, pictureId: string, index?: number) {
  await productAdminStore.deleteImage(productId, pictureId);
  product.value.pictures.splice(index, 1);
}

const initialValues = {
  title: product ? product.value.title : '',
  description: product ? product.value.description : '',
  price: product ? product.value.price : 0,
  pictures: product ? product.value.pictures : []
}
const schema = z.object({
  title: z
    .string({ message: 'Le titre est requis' })
    .min(5, { message: 'Le titre doit comporter au moins 5 caractères' })
    .max(45, { message: 'Le titre ne peut pas dépasser 45 caractères' }),
  image: z
    .file()
    .optional(),
  description: z
    .string({ message: 'La description est requise' })
    .min(5, { message: 'La description doit comporter au moins 5 caractères' })
    .max(45, { message: 'La description ne peut pas dépasser 45 caractères' }),
  price: z
    .coerce.number({ message: 'Le prix doit être un nombre' })
    .min(500, { message: 'Le prix doit être d\'au moins 500' })
    .max(10000, { message: 'Le prix ne peut pas dépasser 10000' }),
})

const { handleSubmit, isSubmitting } =  useForm({
  validationSchema: toTypedSchema(schema),
  initialValues
})

const { value: title, errorMessage: errorTitle } = useField('title');
const { value: description, errorMessage: errorDescription } = useField('description');
const { value: price, errorMessage: errorPrice } = useField('price');
const { value: image, errorMessage: errorImage } = useField('image');

const images = ref(product.value ? product.value.pictures : []);

function onChangeImage(files: FileList) {
  images.value = [ ...images.value, ...files ];
}

const onSubmit = handleSubmit(async (dataProduct, {resetForm}) => {
  try {
    if (!product.value) {
      delete dataProduct.image;
      dataProduct.images = images.value;
      await productAdminStore.addProduct(dataProduct);
      setSuccessMessage('Le produit a bien été ajouté', resetForm);
    } else {
      delete dataProduct.image;
      dataProduct.images = [...product.value.pictures, ...images.value];
      await productAdminStore.updateProduct(dataProduct, route.params.id)
      setSuccessMessage('Le produit a bien été modifié', resetForm);
      }
    } catch(e) {
    setErrorMessage('Erreur de l\'envoi du formulaire');
    console.error('Erreur de l\'envoi du formulaire', e);
  }
});

const successMessage = ref('');
const errorMessage = ref('');

function setSuccessMessage(message, resetForm: () => void) {
  errorMessage.value = '';
  successMessage.value = message;
  setTimeout(() => {
    successMessage.value = '';
    resetForm();
    router.push({path: '/productList'})
  }, 2000)
}

function setErrorMessage(message) {
  errorMessage.value = message;
  setTimeout(() => {
    errorMessage.value = '';
  }, 4000)
}
</script>

<style scoped lang="scss">
/* Votre CSS ici */

.product-form {
  height: 100%;
}

.container-form  {
  max-width: 450px;
  width: 100%;
  h3 {
    text-align: center;
  }
}

.container-images {
  margin-top: 30px;
  .img {
    border-radius: 50%;
    width: 200px;
    height: 200px;
    margin-bottom: 10px; 
  }
}


.card {
  padding: 20px 20px 10px 20px;
}

.success-message {
  color: green;
}

.error-message {
  color: red;
}
</style>