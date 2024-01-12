<template>
  <BaseTemplate>
    <div v-if="!isLoading" class="container h-100">
      <div class="row d-flex align-items-center justify-content-center h-100">
        <div class="col-12 col-sm-12 col-md-8 col-lg-7 col-xl-5">
          <form @submit.prevent="onSubmit(editRegistration)" class="bg-white rounded-2 p-3">
            <h3 class="text-decoration-underline text-center fs-4 mb-3">Inscription</h3>
            <div class="mb-3">
              <label for="firstName" class="form-label">Prénom</label>
              <input v-model="editRegistration.firstName" type="text" class="form-control">
            </div>
            <div class="mb-3">
              <label for="lastName" class="form-label">Nom</label>
              <input v-model="editRegistration.lastName" type="text" class="form-control">
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input v-model="editRegistration.email" type="email" class="form-control" aria-describedby="emailHelp">
            </div>
            <div class="mb-2">
              <label for="password" class="form-label">Mot de passe</label>
              <input v-model="editRegistration.password" type="password" class="form-control">
            </div>
            <div class="mb-3">
              <label for="confirm" class="form-label">Confirmation</label>
              <input v-model="editRegistration.confirm" type="password" class="form-control">
            </div>
            <SubmitButton :buttonRegistration="true">S'inscrire</SubmitButton>
          </form>
        </div>
      </div>
    </div>
  </BaseTemplate>
</template>

<script setup lang="ts">
import {useRegistrationStore} from "@/stores/registrationStore";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import SubmitButton from "@/components/buttons/components/SubmitButton.vue";
import {useRouter} from "vue-router";
import BaseTemplate from "@/BaseTemplate.vue";
import {useMessageStore} from "@/stores/messageStore";

const isLoading = ref(true)

const registrationStore = useRegistrationStore()
const { editRegistration } = storeToRefs(registrationStore)

onMounted(() => {
  registrationStore.initRegistration()
  isLoading.value = false
})

const messageSTore = useMessageStore()
const router = useRouter()

const onSubmit = async (editRegistration) => {
  if (editRegistration.password !== editRegistration.confirm) {
    messageSTore.addMessage('Les mots de passe ne correspondent pas', 'danger')
    return
  }
  await registrationStore.registration()
  await router.push({name: 'login'})
}
</script>

<style scoped lang="scss">
</style>