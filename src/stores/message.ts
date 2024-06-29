import { ref } from 'vue';
import { defineStore } from 'pinia';
import { socket } from './../socket';

import { useUserStore } from './user';

import { IMessage } from '../types';
import { CONNECTED } from '../constants/status';

export const useMessageStore = defineStore('message', () => {
  const messages = ref<IMessage[]>([]);

  const isConnected = ref<boolean>(false);

  const userTyping = ref<string>('');

  const userStore = useUserStore();

  function createMessage(text: string) {
    const message = {
      date: Date.now(),
      text,
      user: userStore.user.email as string || localStorage.getItem('user') as string,
    };

    socket.emit('message:create', message);
  };

  function bindEvents() {
    socket.on('connect', () => {
      isConnected.value = true;

      createMessage(CONNECTED);
    });

    socket.on('message:list', (messageList: IMessage[]) => {
      messages.value = messageList;
    });
    
    socket.on('message:created', (message: IMessage) => {
      messages.value.push(message);
    });

    socket.on('message:isTyping', (user: string) => {
      userTyping.value = user;

      setTimeout(() => {
        userTyping.value = '';
      }, 2000);
    });
  };

  function setIsTyping() {
    socket.emit('message:isTyping', userStore.user.email as string);
  }

  return {
    isConnected,
    messages,
    userTyping,
    bindEvents,
    createMessage,
    setIsTyping,
  };
});
