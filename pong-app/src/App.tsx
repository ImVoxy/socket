import React from 'react';
import './App.css';
import { useEffect, useState } from "react"
import io, { Socket } from "socket.io-client"
import MessageInput from "./components/MessageInput"
import Messages from "./components/Messages"
import { socket } from "./socket"

function App() {
  // const [socket, setSocket] = useState<Socket>(io("http://localhost:8001"))
  const [messages, setMessages] = useState<string[]>([])
  
  // useEffect(() => {
  //   const newSocket = io("http://localhost:8001")
  //   setSocket(newSocket)
  // }, [setSocket])

  const sleep = (ms: any) => new Promise(r => setTimeout(r, ms));

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

  return (
    <>
    <MessageInput socket={socket}/>
    <Messages messages={messages}/>
    </>
  );
}

export default App;
