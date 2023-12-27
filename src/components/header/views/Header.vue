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
      <Calc @close="state.open = false" :open="state.open" :transparent="true" />
      <font-awesome-icon @click="state.open = !state.open" icon="fa-solid fa-bars" class="text-white fs-5 icon" />
      <Transition mode="in-out">
        <ul v-if="state.open" class="list-inline d-flex flex-column m-0 menu-mobile">
          <li>
            <router-link :to="{name: 'boutique'}" class="router-link">
              Boutique
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'admin'}" class="router-link">
              Admin
            </router-link>
          </li>
          <li v-if="userAdminStore.isLogged()">
            <a @click="disconnect" href="#" class="text-danger router-link">Déconnexion</a>
          </li>
          <li v-else class="d-flex flex-column">
            <router-link :to="{name: 'registration'}" class="router-link me-1">
              Inscription
            </router-link>
            <router-link :to="{name: 'login'}" class="text-success router-link">
              Connexion
            </router-link>
          </li>
        </ul>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import {useUserAdminStore} from "@/stores/admin/userAdminStore";
import {useRouter} from "vue-router";
import Calc from "@/components/calc/components/Calc.vue";
import {reactive} from "vue";

const state = reactive<{
  open: boolean
}>({
  open: false
})

const userAdminStore = useUserAdminStore()

const router = useRouter()

const disconnect = () => {
  userAdminStore.logout()
  router.push({name: 'login'})
}
</script>

<style scoped lang="scss">
@use '@/assets/css/mixins' as m;
header {
  background-color: var(--primary-1);
  height: 60px;
  .router-link {
    color: var(--text-primary-color);
    font-size: 15px;
    text-decoration: none;
    @include m.lg {
      color: var(--text-color);
    }
  }
  .icon {
    cursor: pointer;
    font-size: 22px;
  }
}

.menu-mobile {
  position: absolute;
  background-color: var(--text-primary-color);
  border: var(--border);
  width: 230px;
  height: calc(100vh - 60px);
  padding: 10px 20px;
  top: 60px;
  left: 0;
  li, .router-link {
    margin-bottom: 10px;
  }
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

a.router-link-active {
  text-decoration: underline;
}
</style>