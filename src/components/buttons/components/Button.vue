<template>
  <button type="button" class="button" :class="{
    buttonDetails,
    buttonReinitialisation,
    buttonReinitialisation2,
    buttonPrimary,
    buttonPrimaryMenu,
    buttonBasket,
    buttonAddBasket
  }"
  >
    <slot>Envoyer</slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  buttonDetails?: boolean
  buttonReinitialisation?: boolean
  buttonReinitialisation2?: boolean
  buttonPrimary?: boolean
  buttonPrimaryMenu?: boolean
  buttonBasket?: boolean
  buttonAddBasket?: boolean
}>()
</script>

<style scoped lang="scss">
.button {
  color: var(--text-primary-color);
  font-size: 13px;
  border-radius: var(--border-radius);
  padding: 6px;
  border: 0;
  transition: all 150ms ease;
}

.buttonPrimary {
  background-color: var(--primary-1);
  &:hover {
    background-color: var(--primary-2);
  }
}

.buttonReinitialisation {
  background-color: var(--danger-1);
  padding: 7px 0;
  width: 100%;
  &:hover {
    background-color: var(--danger-2);
  }
}

.buttonReinitialisation2 {
  background-color: var(--danger-1);
  padding: 7px 0;
  width: 120px;
  &:hover {
    background-color: var(--danger-2);
  }
}

.buttonPrimaryMenu {
  background-color: var(--primary-1);
  &:hover {
    background-color: var(--primary-2);
  }
}

.buttonBasket {
  background-color: var(--success-1);
  &:hover {
    background-color: var(--success-2);
  }
}

.buttonAddBasket {
  background-color: var(--success-1);
  padding: 8px 12px;
  &:hover {
    background-color: var(--success-2);
  }
}
</style>