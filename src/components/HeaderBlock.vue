<template>
  <header class="header-block">
    <div class="header-block__wrapper">
      <router-link to="/">
        <img
          src="/vite.svg"
          class="logo"
          alt="Vite logo"
        />
      </router-link>
      
      <div v-if="isLoggedIn" class="header-block__actions-wrapper">
        <span class="header-block__user-name">
          <strong>{{ userName }}</strong>
        </span>

        <ButtonBlock :is-plain="true" @onClick="onLogout">Выход</ButtonBlock>
      </div>

      <div v-else class="header-block__actions-wrapper">
        <ButtonBlock :is-plain="true" @onClick="openLogin">Вход</ButtonBlock>
        
        <ButtonBlock :is-disabled="false" @onClick="openSignup">Регистрация</ButtonBlock>
      </div>

      <Transition appear>
        <ModalBlock v-if="modalVisibility" v-model="modalVisibility" :action="actionType"/>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useUserStore } from '../stores/user';
import router from '../router';

import ButtonBlock from './ButtonBlock.vue';
import ModalBlock from './ModalBlock.vue';

import { ActionAuthType } from '../types';

const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.user.isAuthenticated);
const userName = computed(() => userStore.user.email?.split('@')[0]);

const modalVisibility = ref(false);
const openModal = () => modalVisibility.value = true

const actionType = ref<ActionAuthType | null>(null);

const openSignup = () => {
  actionType.value = 'SIGNUP';
  openModal();
};

const openLogin = () => {
  actionType.value = 'LOGIN';
  openModal();
};

const onLogout = () => {
  try {
    userStore.logout();
    router.push({ path: '/' });
  } catch (error) {
    return error;
  }
}
</script>

<style scoped>
.header-block {
  position: relative;
  width: 100%;
  background-color: var(--back-dark);
  border-bottom: 1px solid var(--back-dark);
}

.header-block__actions-wrapper {
  display: flex;
  gap: 16px;
  align-items: center;
}

.header-block__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--border-radius);
  padding: 24px;
  background-color: var(--back-light);
}

.header-block__user-name {
  max-width: 150px;
  font-family: var(--gerbera-font-stack);
  font-size: 18px;
  color: var(--black);
  overflow: hidden;
  text-overflow: ellipsis;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
