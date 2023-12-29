<template>
  <BaseTemplate>
    <div class="container h-100">
      <div class="row d-flex align-items-center justify-content-center h-100">
        <div class="col-12 col-sm-12 col-md-8 col-lg-7 col-xl-6">
          <form @submit.prevent="onSubmit" class="bg-white rounded-2 p-3">
            <div class="mb-3">
              <label for="password" class="form-label">Mot de passe</label>
              <input ref="password" type="password" class="form-control" autofocus>
            </div>
            <div class="mb-2">
              <label for="password" class="form-label">Confirmation</label>
              <input ref="confirm" type="password" class="form-control">
            </div>
            <SubmitButton>Modifier mot de passe</SubmitButton>
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
import {useRoute, useRouter} from "vue-router";
import {useMessageStore} from "@/stores/messageStore";

const password = ref(null)
const confirm = ref(null)

const route = useRoute()

const userStore = useUserStore()
const router = useRouter()

const messageStore = useMessageStore()

const onSubmit = async () => {
  if (password.value.value !== confirm.value.value) {
    messageStore.addMessage('Les mots de passe ne correspondent pas', 'danger')
    return
  }
  await userStore.resetPassword(route.params.token, password.value.value, confirm.value.value)
  await router.push({name: 'login'})
}

</script>

<style scoped lang="scss">
label {
  font-size: 14px;
}
</style>