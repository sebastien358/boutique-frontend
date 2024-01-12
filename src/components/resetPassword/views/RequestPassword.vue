<template>
  <BaseTemplate>
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-sm-12 col-md-8 col-lg-7 col-xl-6">
          <form @submit.prevent="onSubmit" class="bg-white rounded-2 p-3">
            <div class="mb-2">
              <label for="email" class="form-label">Entrer votre email</label>
              <input ref="email" type="email" class="form-control" aria-describedby="emailHelp" autofocus>
            </div>
            <SubmitButton :buttonReinitialisationPassword="true">Réinitialisation de mot de passe</SubmitButton>
          </form>
        </div>
      </div>
    </div>
  </BaseTemplate>
</template>

<script setup lang="ts">
import SubmitButton from "@/components/buttons/components/SubmitButton.vue";
import BaseTemplate from "@/BaseTemplate.vue";
import {useUserStore} from "@/stores/userStore";
import {ref} from "vue";
import {useRouter} from "vue-router";

const email = ref(null)

const userStore = useUserStore()

const router = useRouter()

const onSubmit = async () => {
  try {
    await userStore.requestPassword(email.value.value)
    await router.push({name: 'boutique'})
  } catch(e) {
    await router.push({name: 'request-password'})
  }
}
</script>

<style scoped lang="scss">
label {
  font-size: 14px;
}
</style>