<template>
  <div class="d-flex justify-content-center align-items-center register">
    <div class="form-container"> 
      <h2 class="mb-15 text-center">Inscription</h2>
      <form @submit.prevent="onSubmit">
        <div class="d-flex flex-column mb-15">
          <label for="email">Email</label>
          <input type="email" v-model="email">
          <span v-if="errorEmail" class="form-error">{{ errorEmail }}</span>
        </div>
        <div class="d-flex flex-column mb-15">
          <label for="password">Mot de passe</label>
          <input type="password" v-model="password">
          <span v-if="errorPassword" class="form-error">{{ errorPassword }}</span>
        </div>
        <div class="d-flex flex-column mb-10">
          <label for="confirm-password">Confirmer le mot de passe</label>
          <input type="password" v-model="confirmPassword">
          <span v-if="errorConfirmPassword" class="form-error">{{ errorConfirmPassword }}</span>
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

const successMessage = ref('');
const errorMessage = ref('');

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,10}$/;

const schema = z.object({
  email: z
    .string({ message: 'Le titre est requis' })
    .email(),
  password: z
    .string({ message: 'Un email est requis' })
    .min(4, { message: 'Le titre doit comporter au moins 5 caractères' })
    .max(180, { message: 'Le titre ne peut pas dépasser 45 caractères' })
    .refine(value => passwordRegex.test(value), {
      message: 'Le mot de passe doit contenir : Une Majuscule, une minuscule, 1 chiffre et un carctère spécial'
    }),
  confirmPassword: z
    .string({ message: 'Le prix doit être un nombre' })
    .min(4, { message: 'Le titre doit comporter au moins 5 caractères' })
    .max(180, { message: 'Le titre ne peut pas dépasser 45 caractères' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword']
})

const { handleSubmit, isSubmitting } =  useForm({
  validationSchema: toTypedSchema(schema)
})

const { value: email, errorMessage: errorEmail} = useField('email');
const { value: password, errorMessage: errorPassword } = useField('password');
const { value: confirmPassword, errorMessage: errorConfirmPassword } = useField('confirmPassword');

const onSubmit = handleSubmit(async (dataRegister, {resetForm}) => {
  try {
    const response = await authStore.register(dataRegister);
    if (dataRegister && response) {
      setSuccessMessage('L\'inscription a bien réussie', resetForm);
    } else {
      console.error('Error registration !!!')
    }
    
  } catch(e) {
    setErrorMessage('Erreur de l\'inscription');
    console.error('Erreur de l\'inscription', e);
  }
});

const router = useRouter();

function setSuccessMessage(message, resetForm: () => void) {
  errorMessage.value = '';
  successMessage.value = message;
  setTimeout(() => {
    successMessage.value = '';
    router.push({path: '/login'});
    resetForm();
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
.register {
  height: 100%;
  padding: 20px;
}
</style>
