import { useEffect } from "react";
import { useSocketContext } from "../Context/SocketContext"
import useConversation from "../Zustand/useConversation";

const useListenMessages=()=>{
  const {socket} = useSocketContext();
  const {messages,setMessages} = useConversation();
  useEffect(()=>{
    socket?.on('newMessage', (message) => {
      message.shouldShake =true;
      setMessages( [...messages, message]);
    })
    return () => socket?.off("newMessage");
  },[socket,setMessages,messages])
}

export default useListenMessages
