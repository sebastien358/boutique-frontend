<template>
  <Teleport v-if="open" to="body">
    <div @click="emit('close')" class="calc z-0" :class="{transparent}"></div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  open?: boolean
  transparent?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped lang="scss">
.calc {
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.40);
}

.transparent {
  background-color: transparent;
}
</style>