import React from "react";
import { useState } from 'react';
import { Socket } from "socket.io-client"

function MessageInput( {socket}: {socket: Socket}) {
    const [value, setValue] = useState("")

    const send = (value: string) => {
        socket?.emit("message", value)
    }
    
    const changeTime = (value: number) => {
        socket?.emit("changeTimer", value)
    }

    return (
        <>
            <input onChange={(e) => setValue(e.target.value)} placeholder="Type your message" value={value} />
            <button onClick={() => send(value)}>SEND</button>
            <button onClick={() => changeTime(5000)}>5secondes</button>
            <button onClick={() => changeTime(1000)}>1seconde</button>
        </>
    )
}
export default MessageInput