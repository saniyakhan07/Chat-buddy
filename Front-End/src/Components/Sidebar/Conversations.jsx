import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../Hooks/useGetConversation';

function Conversations() {
 const {loading,conversations}= useGetConversations();

 
 
  return (
    <div className=' px-2 py-2 flex flex-col overflow-auto'>
     {conversations.map((data)=>(
     
      <Conversation key={data.id} converse={data} />

      
     ))}
    </div>
  )
}

export default Conversations
