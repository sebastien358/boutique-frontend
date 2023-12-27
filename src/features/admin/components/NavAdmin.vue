<template>
  <div class="d-flex flex-column px-2 pt-3 nav-admin">
    <nav class="flex-fill">
      <ul class="list-inline">
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
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
@use '@/assets/css/mixins' as m;
.nav-admin {
  background-color: var(--text-primary-color);
  border: var(--border);
  height: calc(100vh - 160px);
  min-width: 200px;
  @include m.md {
    position: fixed;
    height: auto;
  }
  .router-link {
    font-size: 14px;
    color: var(--text-color);
  }
}

a.router-link-active {
  text-decoration: underline;
}
</style>