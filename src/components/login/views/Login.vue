<template>
  <BaseTemplate>
    <div v-if="!isLoading" class="container h-100">
      <div class="row d-flex align-items-center justify-content-center align-items-center h-100">
        <div class="col-12 col-sm-12 col-md-8 col-lg-7 col-xl-5">
          <form @submit.prevent="onSubmit" class="bg-white rounded-2 p-3">
            <h3 class="text-decoration-underline text-center fs-5 mb-3">Connexion</h3>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input v-model="editLogin.email" type="email" class="form-control" aria-describedby="emailHelp" autofocus>
            </div>
            <div class="mb-2">
              <label for="password" class="form-label">Mot de passe</label>
              <input v-model="editLogin.password" type="password" class="form-control">
            </div>
            <div class="d-flex justify-content-between">
              <SubmitButton>Se connecter</SubmitButton>
              <router-link :to="{name: 'request-password'}" class="router-link">Mot de passe oublié?</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </BaseTemplate>
</template>

<script setup lang="ts">
import SubmitButton from "@/components/buttons/components/SubmitButton.vue";
import {useLoginStore} from "@/stores/loginStore";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import BaseTemplate from "@/BaseTemplate.vue";

const isLoading = ref(true)

const loginStore = useLoginStore()
const { editLogin } = storeToRefs(loginStore)

onMounted(() => {
  loginStore.initLogin()
  isLoading.value = false
})

const router = useRouter()

const onSubmit = async () => {
  await loginStore.login()
  await router.push({name: 'admin'})
}
</script>

<style scoped lang="scss">
.router-link {
  color: var(--text-color);
  font-size: 12px;
}
</style>