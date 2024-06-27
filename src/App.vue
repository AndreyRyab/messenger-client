<template>
  <HeaderBlock />

  <main>
    <router-view />
  </main>
  
  <FooterBlock />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';

import { useUserStore } from './stores/user';
import { useMessageStore } from './stores/message';
import { useConnectionStore } from "./stores/connection";

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
    }
  } catch (error) {
    router.push({ path: '/' });
    return console.warn('Токен просрочен');
  }
};

onMounted(async () => await checkIsTokenValid());

const messageStore = useMessageStore();
const connectionStore = useConnectionStore();
socket.off();
messageStore.bindEvents();
connectionStore.bindEvents();

watch(
  () => connectionStore.isConnected,
  () => {
    if (connectionStore.isConnected) {
      console.log('socket connected: ', connectionStore.isConnected);
    }
  },
);
</script>
