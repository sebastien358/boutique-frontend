<template>
  <div v-if="type == 'success'" class="alert alert-success" role="alert">
    {{message}}
  </div>

  <div v-else class="alert alert-danger" role="alert">
    {{message}}
  </div>
</template>

<script setup lang="ts">
import {useMessageStore} from "@/stores/messageStore";
import {storeToRefs} from "pinia";

const messageStore = useMessageStore()
const { message, type } = storeToRefs(messageStore)

message ? setTimeout(() => {
  messageStore.initMessage()
}, 2000) : null
</script>

<style scoped lang="scss">
.alert {
  font-size: 13px;
  text-align: center;
  border-radius: 0;
  margin: 0;
}
</style>