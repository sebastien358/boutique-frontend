<template>
  <button type="button" class="btn btn-primary1">
    <slot>Envoyer</slot>
  </button>
</template>

<script setup lang="ts">
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
</style>