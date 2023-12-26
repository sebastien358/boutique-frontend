<template>
  <nav class="nav-admin ps-3">
    <ul class="list-inline mt-3">
      <h3 class="text-decoration-underline fs-5">Produits</h3>
      <li class="mb-1">
        <router-link :to="{name: 'admin-product-form'}" class="router-link">
          Ajouter un produit
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'admin-product-list'}" class="router-link">
          Liste des produits
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.nav-admin {
  background-color: var(--text-primary-color);
  border: var(--border);
  height: calc(100vh - 160px);
  min-width: 200px;
  .router-link {
    font-size: 14px;
    color: var(--text-color);
  }
}
</style>