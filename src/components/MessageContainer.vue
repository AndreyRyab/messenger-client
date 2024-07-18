<template>
  <div class="message-container">
    <MessageItem
      v-for="message in messageStore.messages"
      :key="message.date"
      :message
      ref="bottomRef"
    />

    <p
      v-if="messageStore.userTyping"
      class="message-container__typing-message">{{ messageStore.userTyping }} is typing...
    </p>

    <span ref="bottomRef" class="message-container__anchor" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

import MessageItem from './MessageItem.vue';

import { useMessageStore } from '../stores/message';

const messageStore = useMessageStore();

const bottomRef = ref<null | HTMLSpanElement>(null);

const scrollToBottom = () => {
  if (bottomRef.value) {
    bottomRef.value?.scrollIntoView({ behavior: 'smooth' });
  }
};

watch(
  () => messageStore.messages.length,
  () => scrollToBottom(),
);
</script>

<style scoped>
.message-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60%;
  background-color: var(--back-dark);
  border-radius: var(--border-radius);
  gap: 4px;
  padding-top: 24px;
  padding-bottom: 24px;
  overflow-y: scroll;
  scrollbar-color: var(--grey) var(--back-dark);
  scrollbar-width: 5px;
  color: var(--black);
}

.message-container__anchor {
  padding-bottom: 200px;
}

.message-container__typing-message {
  padding-top: 8px;
  font-size: 14px;
  color: var(--light-grey);
}
</style>
