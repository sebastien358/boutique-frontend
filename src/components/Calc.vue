<template>
  <Teleport v-if="props.open" to="body">
    <div @click="emit('close')" class="calc"></div>
  </Teleport>
</template>

<script setup lang="ts"> 
const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped lang="scss">
.calc {
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.441);
  position: fixed;
  left: 0;
  top: 0;
}
</style>