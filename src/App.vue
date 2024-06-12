<template>
  <HeaderBlock />

  <NavBlock />

  <main>
    <router-view />
  </main>
  
  <FooterBlock />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { useUserStore } from './stores/user';

import router from './router';

import HeaderBlock from './components/HeaderBlock.vue'
import NavBlock from './components/NavBlock.vue'
import FooterBlock from './components/FooterBlock.vue'

import { checkIsLogged } from './helpers/local-storage';


const userStore = useUserStore();

router.beforeEach(async (to, _) => {
  if (!userStore.user.isAuthenticated && to.name !== 'Home') {
    return { name: 'Home' }
  }
})

const checkIsTokenValid = () => {
  if (!checkIsLogged()) return;

  try {
    userStore.getUser();
  } catch (error) {
    router.push({ path: '/' });
    return console.warn('Токен просрочен');
  }
}

onMounted(() => checkIsTokenValid());
</script>
