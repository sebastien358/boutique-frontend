<template>
  <div class="app-container">
    <Header class="header" />
    <div class="app-content">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <Suspense>
            <Component :is="Component" />
          </Suspense>
        </template>
      </router-view>
    </div>
    <Footer class="footer hide-xs" />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useAuthStore } from './features/admin/stores/authStore';

const authStore = useAuthStore();

function tokenExpiration() {
  setTimeout(() => {
    authStore.checkTokenExpiration()
  }, 50000)
}
tokenExpiration()
</script>

<style lang="scss">
.app-container {
  height: 100vh;
  display: grid;
  grid-template-areas: 'header' 'app-content' 'footer';
  grid-template-rows: 48px auto 48px;
}

.header {
  grid-area: header;
}

.app-content {
  grid-area: app-content;
}

.footer {
  grid-area: footer;
}
</style>