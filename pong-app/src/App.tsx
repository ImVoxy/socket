import React from 'react';
import './App.css';
import { useEffect, useState } from "react"
import io, { Socket } from "socket.io-client"
import MessageInput from "./components/MessageInput"
import Messages from "./components/Messages"
import { socket } from "./socket"

function App() {
  const [messages, setMessages] = useState<string[]>([])
  const [client1, setClient1] = useState('');
  

  const messageListener = (message: string) =>{
    setMessages([...messages, message])
  }

  useEffect(() => {
    socket?.on("message", messageListener)
    return () => {
      socket?.off("message", messageListener)
    }
  }, [messageListener])

  useEffect(() => {
    socket?.on("ping", (data) => {
      console.log("serv :", data);
      socket?.emit("pong", "PONG");
    });
    return () => {
      socket.off("ping");
      
    };
  }, []);

  useEffect(() => {
    // Pour obtenir la valeur partagée
    socket.emit('getClient1');
    socket.on('client1', (value) => {
      setClient1(value);
    });

    // Pour mettre à jour la valeur partagée
    socket.emit('updateClient1', 12);
  }, []);

  return (
    <>
    <div>
      <MessageInput socket={socket}/>
      <Messages messages={messages}/>
    </div>  
      <div>
      <p>Client 1 : {client1}</p>
      </div>
    </>
  );
}

export default App;
