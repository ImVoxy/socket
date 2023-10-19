import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8001';

export const socket = io(URL);

// socket.on("connect", () => {
//     console.log("Connecté au serveur Socket.io");
//   });
  
//   socket.on("disconnect", () => {
//     console.log("Déconnecté du serveur Socket.io, tentative de reconnexion...");
//   });
  
//   socket.on("reconnect", (attemptNumber) => {
//     console.log(`Reconnecté au serveur après ${attemptNumber} tentatives.`);
//   });
  
//   socket.on("reconnect_error", (error) => {
//     console.error("Erreur de reconnexion : ", error);
//   });