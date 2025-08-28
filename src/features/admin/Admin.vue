<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div class="admin">
    <div>
      <NavBar class="navbar" />
    </div>
    <div class="views">
      <router-view v-slot="{Component, route}">
        <Component :is="Component" :key="route.fullPath" />
      </router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin {
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
}
</style>