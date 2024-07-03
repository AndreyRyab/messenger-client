<template>
  <HeaderBlock />

  <main>
    <router-view />
  </main>
  
  <FooterBlock />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';

import { useUserStore } from './stores/user';
import { useMessageStore } from './stores/message';

import { socket } from './socket';

import router from './router';

import HeaderBlock from './components/HeaderBlock.vue';
import FooterBlock from './components/FooterBlock.vue';

import { checkIsLogged } from './helpers/local-storage';

const userStore = useUserStore();

router.beforeEach(async (to) => {
  if (!userStore.user.isAuthenticated && to.name === 'Chat') {
    return { name: 'Home' }
  }
});

const checkIsTokenValid = async () => {
  if (!checkIsLogged()) return;

  try {
    await userStore.getUser();

    if (userStore.user.isAuthenticated) {
      router.push({ name: 'Chat' });

      socket.auth = { username: userStore.user.email };
      
      socket.connect();
    }
  } catch (error) {
    router.push({ path: '/' });
    return console.warn('Токен просрочен');
  }
};

onMounted(async () => await checkIsTokenValid());

const messageStore = useMessageStore();
socket.off();
messageStore.bindEvents();

watch(
  () => messageStore.isConnected,
  () => {
    if (messageStore.isConnected) {
      console.log('socket connected: ', messageStore.isConnected);
    }
  },
);

onUnmounted(() => {
  socket.disconnect();
});
</script>
