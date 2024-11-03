import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import useSendMessage from '../../Hooks/useSendMessage';
const MessageInput = () => {
  const [message,setMessage]= useState("")
 const{loading,sendMessage}= useSendMessage();
  return (
    <form className='px-4 my-3'>
        <div className='w-full flex items-center'>
            <input type='text'
            className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
            placeholder='Type a message...'
            value={message}
            onChange={(e)=>(setMessage(e.target.value))}
            />
            {loading?<div className='loading loading-spinner loading-sm'/>:<div onClick={(e)=>{sendMessage(message); setMessage("");}}><SendIcon /></div>}
        </div>
    </form>
  )
}

export default MessageInput
