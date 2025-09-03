<template>
  <div class="d-flex justify-content-center align-items-center login">
    <div class="d-flex flex-column form-container"> 
      <h2 class="mb-15 text-center">Se connecter</h2>
      <form @submit.prevent="onSubmit">
        <div class="d-flex flex-column mb-15">
          <label for="email">Email</label>
          <input type="email" name="email" v-model="email">
          <span v-if="errorEmail" class="form-error">{{ errorEmail }}</span>
        </div>
        <div class="d-flex flex-column mb-10">
          <label for="password">Mot de passe</label>
          <input type="password" name="password" v-model="password" autocomplete="current-password">
          <span v-if="errorPassword" class="form-error">{{ errorPassword }}</span>
        </div>
        <div class="text-center mb-10">
          <span v-if="successMessage" class="success-message">{{ successMessage }}</span>
          <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
        </div>
        <button class="btn btn-primary" :disabled="isSubmitting">Soumettre</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useAuthStore } from '../../../admin/stores/authStore'
import * as z from 'zod'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();

const router = useRouter();

const successMessage = ref('');
const errorMessage = ref('');

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,10}$/;

const schema = z.object({
  email: z
    .string({ message: 'Le titre est requis' })
    .email(),
  password: z
    .string({ message: 'Un mot de passe est requis' })
    .min(4, { message: 'Le mot de passe ne doit pas doit pas être inférieur à 4 caractères' })
    .max(180, { message: 'Le mot de passe ne doit pas doit pas être supérieur à 180 caractères' })
    .refine(value => passwordRegex.test(value), {
      message: 'Le mot de passe doit contenir : Une Majuscule, une minuscule, 1 chiffre et un carctère spécial'
    })
})

const { handleSubmit, isSubmitting } =  useForm({
  validationSchema: toTypedSchema(schema)
})

const { value: email, errorMessage: errorEmail} = useField('email');
const { value: password, errorMessage: errorPassword } = useField('password');

const onSubmit = handleSubmit(async (dataLogin, {resetForm}) => { 
  try {
   const response = await authStore.emailExists(dataLogin);
   if (!response) {
      setErrorMessage('Aucun compte n\'existe avec cet email.');
   } else {
      await authStore.login(dataLogin);
      authStore.isLoggedIn ? setSuccessMessage('La connexion a bien réussie', resetForm) : 
        setErrorMessage('Mot de passe invalide.')
    }
  } catch(e) {
    setErrorMessage('Erreur login');
    console.error('Erreur de login', e);
  }
});

function setSuccessMessage(message: string, resetForm: () => void) {
  errorMessage.value = '';
  successMessage.value = message;
  setTimeout(() => {
    successMessage.value = '';
    router.push('/admin')
    resetForm();
  }, 2000)
}

function setErrorMessage(message: string) {
  errorMessage.value = message;
  setTimeout(() => {
    errorMessage.value = '';
  }, 3000)
}
</script>


<style scoped lang="scss">
.login {
  height: 100%;
  padding: 20px;
  h2 {
    font-size: 23px;
  }
}
</style>
