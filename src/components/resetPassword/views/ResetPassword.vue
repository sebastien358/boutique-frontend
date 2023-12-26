<template>
  <BaseTemplate>
    <div class="container">
      <div class="row d-flex justify-content-center mt-5">
        <div class="col-12">
          <form @submit.prevent="onSubmit" class="bg-white rounded-2 p-3">
            <div class="mb-3">
              <label for="password" class="form-label">Mot de passe</label>
              <input ref="password" type="password" class="form-control" autofocus>
            </div>
            <div class="mb-2">
              <label for="password" class="form-label">Confirmation</label>
              <input ref="confirm" type="password" class="form-control">
            </div>
            <SubmitButton>Réinitialisation de mot de passe</SubmitButton>
          </form>
        </div>
      </div>
    </div>
  </BaseTemplate>
</template>

<script setup lang="ts">
import SubmitButton from "@/components/buttons/components/SubmitButton.vue";
import {useUserStore} from "@/stores/userStore";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useMessageStore} from "@/stores/messageStore";
import BaseTemplate from "@/BaseTemplate.vue";

const password = ref(null)
const confirm = ref(null)

const userStore = useUserStore()

const messageSTore = useMessageStore()

const route = useRoute()
const router = useRouter()

const onSubmit = async () => {
  if (password.value.value !== confirm.value.value) {
    messageSTore.addMessage('Les mots de passe ne correspondent pas', 'danger')
    return
  }
  await userStore.resetPassword(route.params.token, password.value.value, confirm.value.value)
  await router.push({name: 'login'})
}
</script>