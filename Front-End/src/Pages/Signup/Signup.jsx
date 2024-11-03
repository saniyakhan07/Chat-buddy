import React, { useState } from 'react'
import GenderCheckbox from "./GenderCheckbox";
import { Link } from 'react-router-dom';
import useSignup from '../../Hooks/useSignup.js';
const Signup = () => {

	const {loading,dosignup} =useSignup();

	const [Inputs,SetInput]=useState({
		fullname:'',
		username:'',
		password:'',
		confirmpassword:'',
		gender:'',
	})

	const confirmcheckbox = (gender)=>{
		SetInput({...Inputs,gender:gender})
	}
	
	const submit =async(e)=>{
		e.preventDefault();
		
		const res =await dosignup(Inputs)
		
		
	}
	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> Chat-Buddy</span>
				</h1>

				<form onSubmit={submit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input type='text' placeholder='John Doe' className='w-full input input-bordered  h-10'
						value={Inputs.fullname}
						onChange={(e)=>SetInput({...Inputs,fullname:e.target.value})}
						/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input type='text' placeholder='johndoe' className='w-full input input-bordered h-10'
						value={Inputs.username}
						onChange={(e)=>SetInput({...Inputs,username:e.target.value})}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={Inputs.password}
							onChange={(e)=>SetInput({...Inputs,password:e.target.value})}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={Inputs.confirmpassword}
							onChange={(e)=>SetInput({...Inputs,confirmpassword:e.target.value})}
						/>
					</div>

					<GenderCheckbox onboxChange={confirmcheckbox} selectedGender={Inputs.gender} />

					<Link to={"/login"} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
						Already have an account?
					</Link>

					<div>
                    <button className='btn btn-block btn-sm mt-2 h-10 hover:bg-blue-500 hover:text-white'>Signup</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Signup