<template>
  <div class="navbar">
    <ul>
      <li class="mb-5">
        <router-link to="/productForm">
          <button>Ajouter un produit</button>
        </router-link>
      </li>
      <li>
        <router-link to="/productList">
          <button>Liste des produits</button>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script scoped lang="ts">

</script>

<style scoped lang="scss">
.navbar {
  height: 100%;
  border-right: var(--border);
  padding: 10px;
}

button {
  cursor: pointer;
  padding: 10px;
  border-radius: var(--border-radius);
  border: 0;
  background: white;
  font-weight: 500;
  font-size: 13px;
  &:hover {
    border-radius: var(--border-radius);
    background: black;
    color: white;
    
  }
}

.router-link-active button {
  background: black;
  border-radius: var(--border-radius);
  color: white;
}

a.router-link-active {
  text-decoration: none;
}
</style>