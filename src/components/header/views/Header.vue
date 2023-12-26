<template>
  <header class="ps-2 pe-2 pe-lg-3 d-flex align-items-center justify-content-between justify-content-lg-start position-fixed w-100 z-1">
    <a href="http://localhost:5173" class="nav-link d-flex align-items-center flex-row me-4">
      <img src="@/assets/images/logo.svg" height="27">
      <h3 class="text-white fs-5 m-0">Dyma</h3>
    </a>

    <nav class="d-none d-lg-block flex-fill">
      <ul class="list-inline d-flex align-items-center flex-row m-0">
        <li class="me-2">
          <router-link :to="{name: 'boutique'}" class="router-link">
            Boutique
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'admin'}" class="router-link">
            Admin
          </router-link>
        </li>
      </ul>
    </nav>

    <nav class="d-none d-lg-block">
      <ul class="list-inline d-flex align-items-center flex-row m-0">
        <li v-if="userAdminStore.isLogged()">
         <a @click="disconnect" href="#" class="router-link">Déconnexion</a>
        </li>
        <li v-else>
          <router-link :to="{name: 'registration'}" class="router-link me-1">
            Inscription
          </router-link>
          <router-link :to="{name: 'login'}" class="router-link">
            Connexion
          </router-link>
        </li>
      </ul>
    </nav>

    <nav class="d-block d-lg-none">
      <font-awesome-icon icon="fa-solid fa-bars" class="text-white fs-5" />
    </nav>
  </header>
</template>

<script setup lang="ts">
import {useUserAdminStore} from "@/stores/admin/userAdminStore";
import {useRouter} from "vue-router";

const userAdminStore = useUserAdminStore()

const router = useRouter()

const disconnect = () => {
  userAdminStore.logout()
  router.push({name: 'login'})
}
</script>

<style scoped lang="scss">
header {
  background-color: var(--primary-1);
  height: 60px;
}

.router-link {
  color: var(--text-primary-color);
  font-size: 15px;
}
</style>