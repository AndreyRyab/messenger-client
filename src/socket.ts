import { reactive } from 'vue';
import { io, Socket } from 'socket.io-client';

export const state = reactive({
  connected: false,
  messageEvents: [],
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

export const socket: Socket = io(URL);

socket.on('connect', () => {
  state.connected = true;
});

socket.on('disconnect', () => {
  state.connected = false;
});

socket.on('message', (...args) => {
  state.messageEvents.push(args);
});
