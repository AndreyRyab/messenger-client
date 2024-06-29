<template>
  <div :class="['message-item', { ['message-item_is-user']: isUser }, { ['message-item_is-status']: isStatusMessage }]">
    <template v-if="isStatusMessage">
      <p class="message-item__status-text">{{ statusMessage }}</p>
    </template>
    
    <template v-else>
      <p class="message-item__user">{{ userName }}:</p>

      <p class="message-item__text">
        {{ message.text }}
      </p>

      <p class="message-item__date">
        {{ timeStamp }}
      </p>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useUserStore } from '../stores/user';

import { CONNECTED, DISCONNECTED } from '../constants/status';

import { IMessage } from '../types';

interface IProps {
  message: IMessage;
}

const props = defineProps<IProps>();

const isUser = computed(() => props.message.user === userStore.user.email);

const userStore = useUserStore();
const userName = computed(() => (isUser.value ? 'You' : props.message.user));

const timeStamp = computed(() => {
  const date = new Date(props.message.date);

  const minutes = date.getMinutes();

  return `${date.getHours()}:${(minutes < 10 ? '0' : '') + minutes}`;
});

const isStatusMessage = computed(() => [CONNECTED, DISCONNECTED].includes(props.message.text));
const statusMessage = computed(() => {
  if (props.message.text === CONNECTED) {
    return `${props.message.user} is connected`;
  }

  return `${props.message.user} is disconnected`;
});
</script>

<style scoped>
.message-item {
  display: flex;
  flex-direction: column;
  width: 95%;
  align-self: flex-start;
  border-radius: var(--border-radius-message);
  background-color: var(--back-light);
  padding: 18px;
  color: black;
}

.message-item_is-user {
  align-self: flex-end;
  border-radius: var(--border-radius-message-user);
  background-color: var(--back-light-blue);
}

.message-item_is-status {
  border: none;
  background-color: transparent;
}

.message-item__user {
  font-size: 16px;
  font-weight: bold;
  color: var(--black);
  margin-bottom: 6px;
}

.message-item__text {
  font-size: 14px;
  color: var(--grey);
  margin-bottom: 8px;
}

.message-item__status-text {
  font-size: 14px;
  color: var(--light-grey);
}

.message-item__date {
  font-size: 12px;
  color: var(--light-grey-contrast);
  font-style: italic;
  align-self: flex-end;
}
</style>
