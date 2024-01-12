<template>
  <button type="button" class="btn btn-primary1" :class="{buttonDetails}">
    <slot>Envoyer</slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  buttonDetails: boolean
}>()
</script>

<style scoped lang="scss">
.btn-primary1 {
  background-color: var(--primary-1);
  color: var(--text-primary-color);
  font-size: 13px;
  &:active {
    background-color: var(--primary-1);
    color: var(--text-primary-color);
  }
}

.buttonDetails {
  background-color: var(--primary-1);
  color: var(--text-primary-color);
  font-size: 13px;
  &:active {
    background-color: var(--primary-1);
    color: var(--text-primary-color);
  }
}
</style>