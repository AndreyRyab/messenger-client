import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import ChatPage from '../views/ChatPage.vue';
import NotFoundPage from '../views/NotFoundPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/chat', name: 'Chat', component: ChatPage },
  { path: '/:pathMatch(.*)*', name: 'Not Found', component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
