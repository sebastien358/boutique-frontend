<template>
  <div v-if="open" class="d-flex align-items-center justify-content-center calc-delete-product z-1">
    <div class="bg-white py-3 px-4 content">
      <p class="text-center m-0 pb-2">Voulez-vous vraiment supprimer cet article ?</p>
      <div class="d-flex flex-row justify-content-center">
        <Button @click="emit('close')" class="bg-secondary">Annuler</Button>
        <div class="separator"></div>
        <Button @click="emit('deleteProductId', id)" class="bg-primary">Ok</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/buttons/components/Button.vue";

defineProps<{
  open: boolean
  id: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'deleteProductId', id: number): void
}>()
</script>

<style scoped lang="scss">
.calc-delete-product {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  border: 1px solid var(--gray-3);
  background-color: rgba(0, 0, 0, 0.10);
}

.content {
  width: auto;
  p {
    font-size: 15px;
  }
}

.separator {
  margin: 0 2px;
}
</style>