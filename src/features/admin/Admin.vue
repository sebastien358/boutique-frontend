<template>
  <BaseTemplate>
    <div class="d-flex flex-row admin">
      <NavAdmin />
      <RouterView v-slot="{Component}">
        <Transition mode="out-in">
          <Component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </BaseTemplate>
</template>

<script setup lang="ts">
import NavAdmin from "@/features/admin/components/NavAdmin.vue";
import BaseTemplate from "@/BaseTemplate.vue";
</script>

<style scoped lang="scss">
.admin {
  height: calc(100vh - 160px);
}
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 200ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>