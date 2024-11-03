import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../Hooks/useLogin'
import { useAuthContext } from '../../Context/AuthContext'
import toast from 'react-hot-toast'

const Login = () => {
  const {authUser,setAuthUser} =  useAuthContext();
  const {loading,login}=useLogin();

  const [inputs,setInputs]=useState({
    username:'',
    password:'',
  })

  const submit = (e)=>{
    e.preventDefault();
   
    login(inputs);
    
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter  backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>Login <span className='text-blue-500'>Chat-Buddy</span></h1>
       <form >
        <div>
        <label className='label p-2'>
            <span className='text-base label-text'>Username</span>
        </label>
        <input type='text' placeholder='Enter Username'  className='w-full input input-bordered h-10'
        value={inputs.username}
        onChange={(e)=>setInputs({...inputs,username:e.target.value})}
        />
        </div>

        <div>
        <label className='label p-2'>
            <span className='text-base label-text'>Password</span>
        </label>
        <input type='password' placeholder='Password'  className='w-full input input-bordered h-10'
        value={inputs.password}
        onChange={(e)=>setInputs({...inputs,password:e.target.value})}
        />
        </div>
             <Link to={"/signup"} className='text-sm hover:underline hover: text-blue-600 mt-2 inline-block'>
            {"Don't"} have an account?
            </Link>
            <div className=' mb-12'>
            {loading?<div className='loading loading-spinner loading-md'/>:<button className='btn btn-block btn-sm mt-2 h-10 hover:bg-blue-500 hover:text-white'
            onClick={submit}
            >Login</button>}
           {/* <div>
						<button className='btn btn-block btn-sm mt-2' disabled={loading} onClick={submit}>
							{loading ? <span className='loading loading-spinner '></span> : "Login"}
              login
						</button>
					</div> */}
            </div>
       </form>
      </div>
    </div>
  )
}

export default Login
