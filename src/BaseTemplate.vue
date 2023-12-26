<template>
  <div class="app-container">
    <Header class="header" />
    <div v-if="message !== null" class="message">
      <Alert />
    </div>
    <div class="components">
      <slot  />
    </div>
    <Footer class="footer" />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/header/views/Header.vue";
import Footer from "@/components/footer/views/Footer.vue";
import Alert from "@/components/alert/components/Alert.vue";
import {useMessageStore} from "@/stores/messageStore";
import {storeToRefs} from "pinia";

const messageStore = useMessageStore()
const { message, type } = storeToRefs(messageStore)
</script>

<style scoped lang="scss">
.app-container {
  display: grid;
  grid-template-areas: 'header' 'message' 'components' 'footer';
  grid-template-rows: 60px auto 1fr 100px;
  height: 100vh;
  .header {
    grid-area: header;
  }
  .message {
    grid-area: message;
  }
  .components {
    grid-area: components;
    background-color: var(--gray-1);
  }
  .footer {
    grid-area:footer;
  }
}
</style>