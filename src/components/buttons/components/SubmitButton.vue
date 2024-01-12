<template>
  <button type="submit" class="button" :class="{
    buttonReinitialisationPassword,
    buttonPrimaryForm,
    buttonRegistration,
    buttonLogin
  }"
  >
    <slot>Envoyer</slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  buttonReinitialisationPassword?: boolean
  buttonPrimaryForm?: boolean
  buttonRegistration?: boolean
  buttonLogin?: boolean
}>()
</script>

<style scoped lang="scss">
.button {
  color: var(--text-primary-color);
  font-size: 13px;
  border-radius: var(--border-radius);
  padding: 7px 14px;
  border: 0;
  transition: all 150ms ease;
}

.buttonPrimaryForm {
  background-color: var(--primary-1);
  &:hover {
    background-color: var(--primary-2);
  }
}

.buttonLogin {
  background-color: var(--primary-1);
  padding: 6px 10px;
  &:hover {
    background-color: var(--primary-2);
  }
}

.buttonRegistration {
  background-color: var(--primary-1);
  padding: 6px 10px;
  &:hover {
    background-color: var(--primary-2);
  }
}

.buttonReinitialisationPassword {
  background-color: var(--primary-1);
  padding: 6px 10px;
  &:hover {
    background-color: var(--primary-2);
  }
}
</style>