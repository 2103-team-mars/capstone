import { io } from 'socket.io-client';

export const socket = io('https://hello-health-app.herokuapp.com/');
