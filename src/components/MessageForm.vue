<template>
  <div class="message-form">
    <form class="message-form__form-wrapper">
      <textarea
        v-model="text"
        name="text"
        maxlength="1000"
        placeholder="Type here..."
        class="message-form__textarea"
        required
        autofocus
        @keydown.enter.exact.prevent="onSubmit"
      />

      <span :class="['message-form__error', { 'message-form__error_visible': isError }]">You're trying to send an empty message</span>
  
      <ButtonBlock
        is-submit
        is-form
        is-plain
        @on-click="onSubmit"
      >
        Send
      </ButtonBlock>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import ButtonBlock from './ButtonBlock.vue';

import { useMessageStore } from '../stores/message';

const text = ref('');
const messageStore = useMessageStore();
const onSubmit = () => {
  isError.value = false;

  if (!text.value.trim()) {
    isError.value = true;
    return;
  };

  messageStore.createMessage(text.value);
  text.value = '';
  isError.value = false;
};

const isError = ref(false);
</script>

<style scoped>
.message-form {
  max-height: fit-content;
  border-radius: var(--border-radius);
  padding: 24px;
  background-color: var(--back-light-blue);
}

.message-form__form-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  width: 100%;
}

.message-form__textarea {
  height: 100px;
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 8px;
  resize: none;
}

@media (min-width: 670px) {
  .message-form__textarea {
    width: 70%;
  }
}

.message-form__error {
  position: absolute;
  top: -20px;
  color: red;
  display: none;
}

.message-form__error_visible {
  display: block;
}
</style>
