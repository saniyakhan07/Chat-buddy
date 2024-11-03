import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import useConversation from '../../Zustand/useConversation';
import useGetConversations from '../../Hooks/useGetConversation';
import toast from 'react-hot-toast';
function SearchInput() {
  const [search,setSearch] = useState('')
  const {setSelectedConversation} = useConversation();
  const {conversations} =useGetConversations();
  
  const handlesubmit = (e)=>{
    e.preventDefault();
    if(!search) return;
    if(search.length<3){
      return toast.error('search term  must be at least 3 characters long')
    }

    const conversation = conversations.find((c)=>c.fullname.toLowerCase().includes(search.toLowerCase()));
    if(conversation){
      setSelectedConversation(conversation)
      setSearch('')
    }
    else toast.error('no such user found')
  }

  return (
    <form onSubmit={handlesubmit} className='flex items-center gap-2'>
        <input type="text" placeholder='search...' className='input input-bordered rounded-full m-2'
         value={search}
         onChange={(e)=>(setSearch(e.target.value))}
        />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <SearchIcon className='w-6 h-6' />
        </button>
    </form>
  )
}

export default SearchInput
