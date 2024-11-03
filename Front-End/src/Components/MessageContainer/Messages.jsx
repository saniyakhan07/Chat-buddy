import React, { useEffect, useRef } from 'react'
import Message from './Message'
 import useGetMessage from '../../Hooks/useGetMessage'
import Skeleton from '../skeleton/Skeleton';
import useListenMessages from '../../Hooks/useListenMessages.js';

const Messages = () => {
  const{messages,loading}=useGetMessage();
  useListenMessages();
  const lastMessageRef = useRef();
  
  useEffect(()=>{
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({behavior:"smooth"});
    },100)
  },[messages])

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {
        loading && [...Array(3)].map((_,idx)=><Skeleton key={idx}/>)
      }
      { !loading && messages.length===0 && (
        <p className='text-center text-2xl'> Send Message to start the Conversation</p>
      )}
      {
        !loading && messages.length>0 && messages.map((mess)=>(
          <div
          key={mess._id} 
          ref={lastMessageRef}
          >
            <Message message={mess} />
          </div>
          
        ))
      }
    </div>
  )
}

export default Messages
