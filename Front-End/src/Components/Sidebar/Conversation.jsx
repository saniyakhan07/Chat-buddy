import React from 'react'
import generateRandomEmojisArray from '../../Utils/emojis'
import useConversation from '../../Zustand/useConversation'
import { useSocketContext } from '../../Context/SocketContext';

function Conversation({converse}) {
  const {selectedConversation,setSelectedConversation} = useConversation();
  const isSelected = selectedConversation?._id === converse._id;

  const {onlineUsers} =  useSocketContext();
  const isOnline = onlineUsers.includes(converse._id)
  
  return (
  <>
  <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected?"bg-blue-500":""}`}
   onClick={(e)=>(setSelectedConversation(converse))}
  >
    <div className={`avatar ${isOnline?"online":""}`}>
        <div className='w-12 rounded-full'>
        <img src={`https://api.multiavatar.com/${converse.fullname}.svg`} />
            {/* image source link */}
        </div>
    </div>
    {/* username and emogies */}
    <div className='flex flex-col flex-1'>
        <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>{converse.fullname}</p>
            <span className='text-xl'>{generateRandomEmojisArray()}</span>
        </div>
    </div>
  </div>
  <div className='divider my-0 py-0 h-1'/>
  </>
  )
}

export default Conversation
