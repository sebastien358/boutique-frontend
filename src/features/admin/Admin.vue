<template>
  <BaseTemplate>
    <div class="d-flex flex-row admin">
      <Transition mode="in-out">
        <div v-if="state.open">
          <NavAdmin />
        </div>
      </Transition>
      <div class="d-flex flex-column w-100">
        <div class="d-flex flex-column justify-content-center mt-2 mx-3 d-block d-md-none">
          <Button @click="state.open = !state.open">Menu</Button>
        </div>
        <RouterView v-slot="{Component}">
          <Transition mode="out-in">
            <Component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>
  </BaseTemplate>
</template>

<script setup lang="ts">
import NavAdmin from "@/features/admin/components/NavAdmin.vue";
import BaseTemplate from "@/BaseTemplate.vue";
import Button from "@/components/buttons/components/Button.vue";
import {reactive} from "vue";

const state = reactive<{
  open: boolean
}>({
  open: !matchMedia('(max-width: 575.98px)').matches
})
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

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>