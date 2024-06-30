<template>
  <form
    :model="form"
    class="auth-form"
  >
    <h2 class="auth-form__title">{{ actionName }}</h2>

    <p
      v-if="!!userMessage"
      :class="['auth-form__message', { 'auth-form__message_error': isFailed }]"
    >
      {{ userMessage }}
    </p>

    <fieldset class="auth-form__fieldset">
      <div class="auth-form__field-item">
        <label
          for="email"
          class="auth-form__label"
        >
          email
        </label>

        <input
          v-model="form.email"
          name="email"
          class="auth-form__input"
          type="email"
          autofocus
        />
      </div>

      <div class="auth-form__field-item">
        <label
          for="password"
          class="auth-form__label"
          >password</label
        >
        <input
          v-model="form.password"
          name="password"
          class="auth-form__input"
          type="password"
        />
      </div>
    </fieldset>

    <div class="auth-form__actions-wrapper">
      <ButtonBlock
        :is-form="true"
        :is-disabled="isBtnDisabled"
        :is-submit="true"
        @on-click="onSubmit"
      >
        Submit
      </ButtonBlock>

      <ButtonBlock
        :is-form="true"
        :is-plain="true"
        :is-disabled="isBtnDisabled"
        @on-click="onCancel"
      >
        Cancel
      </ButtonBlock>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import router from '../router';

import { useUserStore } from '../stores/user';

import { ActionAuthType, IUser } from '../types';

import { FAILED, IN_PROGRESS } from '../constants/status';

import ButtonBlock from './ButtonBlock.vue';


interface IActionParams {
  method: () => Promise<void>;
  text: string;
}

const props = withDefaults(defineProps<{ action: ActionAuthType | null }>(), {
  action: 'SIGNUP',
});
const mapActionsToParams: Record<ActionAuthType, IActionParams> = {
  SIGNUP: {
    method: async () => await userStore.signup(form.value),
    text: 'Register',
  },
  LOGIN: {
    method: async () => await userStore.login(form.value),
    text: 'Login',
  },
  LOGOUT: {
    method: async () => await userStore.logout(),
    text: 'Logout',
  },
};
const actionName = computed(() => mapActionsToParams[props.action as ActionAuthType]?.text);

const emits = defineEmits({
  'close-modal': null,
});

const inititalForm: IUser = {
  email: null,
  password: null,
  _id: null,
};
const form = ref<IUser>({ ...inititalForm });

const clearForm = () => {
  form.value = { ...inititalForm };
  userMessage.value = '';
};

const delayedCloseModal = () => {
  setTimeout(onCancel, 1000);
};

const userStore = useUserStore();
const userMessage = ref('');
const isBtnDisabled = ref(false);

const onSubmit = async () => {
  userMessage.value = '';
  isBtnDisabled.value = true;
  
  try {
    await mapActionsToParams[props.action as ActionAuthType].method();

    delayedCloseModal();
  } catch (error) {
    userMessage.value = (error as Error).message;

    userStore.user.loadingStatus === FAILED;
  } finally {
    isBtnDisabled.value = false;
  }
};

const onCancel = () => {
  clearForm();
  emits('close-modal');
};

const isFailed = computed(() => userStore.user.loadingStatus === FAILED);

watch(
  () => userStore.user.loadingStatus,
  (value) => {
    if (value === IN_PROGRESS) userMessage.value = 'Please wait...';
  }
);
watch(
  () => userStore.user.isAuthenticated,
  (value) => {
    if (!value) {
      userMessage.value = '';
      isBtnDisabled.value = false;
    }
    else {
      router.push({ name: 'Chat' });
    }
  }
);
</script>

<style scoped>
.auth-form__title {
  text-align: center;
  font-size: 2em;
}

.auth-form__fieldset {
  border: none;
  width: fit-content;
  max-width: 320px;
  margin: 0 auto;
  padding: 32px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.auth-form__message {
  margin: 16px auto 0;
  max-width: 180px;
  text-align: center;
  font-size: 12px;
  color: green;
}

.auth-form__message_error {
  color: var(--alert);
}

.auth-form__label {
  margin-bottom: 4px;
  display: block;
  color: var(--grey);
  font-size: 8px;
  line-height: 1.2;
}

.auth-form__input {
  border: 1px solid var(--grey);
  border-radius: 10px;
  height: 36px;
  width: 240px;
  font-size: 16px;
  padding: 0 10px;
}

.auth-form__actions-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
</style>
