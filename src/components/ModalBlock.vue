<template>
  <div
    :class="['modal-block', { 'modal-block_visible': modelValue }]"
    @click="closeModal"
    @keyup.esc="closeModal"
  >
    <div class="modal-block__content" @click.stop>
      <button
        class="modal-block__button"
        @click="closeModal"
      >
        <span class="modal-block__button-text">+</span>
      </button>
      
      <AuthForm :action="action" @close-modal="closeModal"></AuthForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

import AuthForm from './AuthForm.vue';

import { ESC_CODE } from '../constants/common';
import { ActionAuthType } from '../types';

defineProps<{
  modelValue: boolean;
  action: ActionAuthType | null;
}>();

const emits = defineEmits({
  'update:model-value': null,
});

const closeModal = () => emits('update:model-value', false);

const handleCloseOnEsc = (event: { keyCode: number }) => {
  if (event.keyCode === ESC_CODE) closeModal();
}

onMounted(() => document.addEventListener('keyup', handleCloseOnEsc));

onUnmounted(() => document.removeEventListener('keyup', handleCloseOnEsc))
</script>

<style scoped>
.modal-block {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 3rem;
  background-color: var(--back-dark-transparent);
  display: none;
  transition: visibility 400ms ease-in-out;
}

.modal-block_visible {
  display: block;
} 

.modal-block__content {
  position: relative;
  margin: 0 auto;
  border-radius: var(--border-radius);
  height: fit-content;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 42px 38px;
  background-color: var(--back-light);
}

.modal-block__button {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  border-radius: 50px;
  background-color: inherit;
  padding: 13px;
  font-size: 30px;
  line-height: 0.6;
  transform: rotateZ(45deg);
  transition: transform 600ms ease-in-out;
}

.modal-block__button:hover {
  transform: rotateZ(360deg);
  transition: transform 500ms, transform 200ms ease-in-out;
}
</style>
