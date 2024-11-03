import {useState} from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../Context/AuthContext';
const useSignup = () => {
    const [loading,setLoading]= useState(false);

    const {authUser,setAuthUser} = useAuthContext()

    const dosignup = async({fullname,username,password,confirmpassword,gender})=>{
      const checkValue = handleInputError({fullname,username,password,confirmpassword,gender})
      if(!checkValue) return "checkvaluefalse";
      setLoading(true)
      try{
        const res = await fetch(`${import.meta.env.VITE_LOCAL_HOST}/api/auth/signup`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          credentials:"include",
          body:JSON.stringify({fullname,username,password,confirmpassword,gender})
        })
        if(res.error){
          throw new Error(res.error);
        }
        
        const data = res.json();
        localStorage.setItem("chat-user",JSON.stringify(data))
        if(data) toast.success("Signup sucessful , Login Please! ")
          // setAuthUser(data);
      }
      catch(error){
        toast.error(error.message)
      } finally{
        setLoading(false)
      }
    };

    return {loading,dosignup}
}

export default useSignup

function handleInputError({fullname,username,password,confirmpassword,gender}){
  if(!fullname || !username || !password || !confirmpassword || !gender){
    toast.error("All field are required")
    return false;
  }
  if(password.length<6) {
    toast.error("Password must be 6 characters long")
    return false;
  }
  if(password !== confirmpassword) {
    toast.error("password don't match")
    return false;
  }
  return true;
}