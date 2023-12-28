<template>
  <div class="d-flex flex-column px-2 pt-3 nav-admin">
    <nav class="flex-fill">
      <ul class="list-inline">
        <h3>Produits</h3>
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
  h3 {
    font-size: 18px;
    @include m.md {
      color: var(--text-primary-color);
    }
  }
  @include m.md {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.80);
    height: auto;
    border: 0;
  }
  .router-link {
    font-size: 14px;
    color: var(--text-color);
    @include m.md {
      font-size: 12px;
      color: var(--text-primary-color);
    }
  }
}

a.router-link-active {
  text-decoration: underline;
}
</style>