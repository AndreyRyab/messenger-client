import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import ChatPage from '../views/ChatPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/chat', name: 'Chat', component: ChatPage },
  /* {
    path: '*',
    component: () => import('./pages/404/index.vue'),
  }, */
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;