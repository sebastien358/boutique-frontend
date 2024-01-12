<template>
  <button type="submit" class="button" :class="{
    buttonPrimaryForm
  }"
  >
    <slot>Envoyer</slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  buttonPrimaryForm?: boolean
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
</style>