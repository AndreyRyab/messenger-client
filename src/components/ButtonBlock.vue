<template>
  <button
    :disabled="isDisabled"
    :class="['button-block', { 'button-block__plain': isPlain }, { 'button-block_form': isForm }]"
    :type="type"
    @click="$emit('on-click')"
  >
    <slot></slot>

    <span></span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IProps {
  isPlain: boolean;
  isDisabled: boolean;
  isForm: boolean;
  isSubmit: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  isDisabled: false,
  isPlain: false,
  isForm: false,
  isSubmit: false,
});

defineEmits<{ (e: 'on-click'): void }>();

const type = computed(() => props.isSubmit ? 'submit' : 'button');
</script>

<style scoped>
.button-block {
  display: inline-flex;
  border: none;
  border-radius: 50px;
  padding: 12px 16px;
  font-size: 16px;
  color: var(--back-light);
  background-color: var(--back-dark);
}

.button-block_form {
  border-radius: 10px;
}

.button-block__plain {
  border: 1px solid var(--back-dark);
  background-color: var(--back-light);
  color: var(--back-dark);
}

.button-block:not(button:disabled) span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button-block:not(button:disabled) span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button-block:not(button:disabled):hover span {
  padding-right: 25px;
}

.button-block:not(button:disabled):hover span:after {
  opacity: 1;
  right: 0;
}
</style>
