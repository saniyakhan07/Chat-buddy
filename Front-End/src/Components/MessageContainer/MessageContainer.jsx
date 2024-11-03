import React, { useDebugValue, useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import useConversation from '../../Zustand/useConversation';
import { useAuthContext } from '../../Context/AuthContext';
const MessageContainer = () => {
 const {selectedConversation,setSelectedConversation} =useConversation();

 useEffect(()=>{
  return ()=>setSelectedConversation(null);
 },[setSelectedConversation])
  return (
    <div className=' md:min-w-[450px] flex flex-col'>
        {
          !selectedConversation ? <NochatSelected/> :(
            <>
        {/* header */}
        <div className=''>
            <span className=' label-text'>To:</span>
            <span className='text-gray-900 font-bold'>{selectedConversation.fullname}</span>

        </div>
        <Messages/>
        <MessageInput/>
        </>
          )
        }
    </div>
  )
}

export default MessageContainer

const NochatSelected = ()=>{
  const {authUser} = useAuthContext();
  return(
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 {authUser.fullname} 🌸</p>
        <p>Select a chat to start messaging</p>
        <MarkChatUnreadIcon/>
      </div>
    </div>
  )
}