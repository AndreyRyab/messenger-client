<template>
  <div class="chat-page">
    <MessageContainer />

    <MessageForm />
  </div>
</template>

<script lang="ts" setup>
import MessageContainer from '../components/MessageContainer.vue';
import MessageForm from '../components/MessageForm.vue';
</script>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 82vh;
  padding: 24px;
  color: aliceblue;
}
</style>
