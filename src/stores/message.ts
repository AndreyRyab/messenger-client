import { ref } from 'vue';
import { defineStore } from 'pinia';
import { socket } from './../socket';

import { useUserStore } from './user';

import { IMessage } from '../types';

const initialState: IMessage[] = [];

export const useMessageStore = defineStore('message', () => {
  const messages = ref<IMessage[]>(initialState);

  function bindEvents() {
    socket.on('connect', () => {
      socket.emit('message:list', (res) => {
        messages.value = res.data;
        console.log('client, message:list', messages.value);
      });
    });

    socket.on('message:created', (message: IMessage) => {
      messages.value.push(message);
    });
  };

  function createMessage(text: string) {
    const userStore = useUserStore();
    
    const message = {
      date: Date.now(),
      text,
      user: userStore.user.email as string,
    };

    socket.emit('message:create', message, (res) => {
      console.log('client, message:create', res);
    });
  };

  return {
    messages,
    bindEvents,
    createMessage,
  }
});
