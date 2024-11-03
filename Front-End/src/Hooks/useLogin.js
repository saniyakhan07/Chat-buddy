import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../Context/AuthContext';

const useLogin = () => {


   const {setAuthUser} = useAuthContext();

  
  const [loading,setLoading]=useState(false)
  const login = async({username,password})=>{
    const check = checkValues({username , password});
    if(!check) return;

    try {
      setLoading(true);
      
      
      const response = await fetch(`${import.meta.env.VITE_LOCAL_HOST}/api/auth/login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        credentials:"include",
        body:JSON.stringify({username,password})
      })
     
      const data = await response.json()
        if(data.error){
            throw new Error(data.error)
        }
      localStorage.setItem("chat-user",JSON.stringify(data))
      toast.success("Login Successful")
      setAuthUser(data);
    } catch (error) {
     
      toast.error(error.message)
    }
    finally{
      setLoading(false)
    }
  }
  return {loading,login}
}

export default useLogin

function checkValues({username,password}){
  if(!username || !password) {
    toast.error("All fields are required 🖊️")
    return false;
  }
  return true;
}