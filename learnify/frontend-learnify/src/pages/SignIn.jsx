import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { message } from 'antd'
import useUserStore from '../store/userStore'
import AxiosInstances from '../apiManager'
import auth from '../apiManager/AuthApi'
import { setToken } from '../helper'
import toast from 'react-hot-toast'

function SignIn() {
  const [hidePassword, setHidePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {register, reset, handleSubmit, formState:{errors}} = useForm();
  const {setUser} = useUserStore();
  const navigate = useNavigate()

  const toggleHiddePassword=(e)=>{
    e.preventDefault();
    setHidePassword(!hidePassword)
  }

  const submitSignInForm = async (data) => {
    setIsLoading(true)
    try{
      const response = await auth.signin(data);
      reset();
      setUser(response.data.user);
      setToken(JSON.stringify(response.data.token));
      navigate("/")
      toast.success("Login Successfull!")
    }
    catch(err){
      console.log(err)
      toast.error("Login failed! Please check your credentials")
      setIsLoading(false)
    }
  }

  return (
    <div className='h-screen bg-green-100 flex flex-col items-center justify-center'>
      <div className='w-full max-w-lg bg-white rounded-lg px-5 py-6'>
        <div className='text-center'>
          <p className='text-sm text-gray-700 mb-5'>Sign in to access your account</p>
        </div>
        <form className='text-center' onSubmit={handleSubmit(submitSignInForm)}>
          {/* Email Feild */}
          <div>
            <input type="text" placeholder='Enter Your Email' className={"block border px-5 py-2 rounded-lg w-full bg-gray-100 placeholder-gray-600 focus:ring focus:ring-green-300 focus:outline-none mb-3"} {...register("email",{required : "Email is required"})}/>
          </div>
          {errors.email && (<p className='text-red-500 mb-2'>{errors.email.message}</p>)}

          {/* Password Feild */}
          <div className='relative'>
            <input type={`${hidePassword ? "text" : "password"}`} placeholder='Enter Your Psaaword' className={"block border px-5 py-2 rounded-lg w-full bg-gray-100 placeholder-gray-600 focus:ring focus:ring-green-300 focus:outline-none mb-3"} 
            {...register("password", {
              required : "Password is required",
              minLength : {
                value : 8,
                message : "Password must be eight characters long"
              }
              // pattern : {
              //   value : 
              //   message : 
              // }
            })}/>
            <button onClick={(e) => {toggleHiddePassword(e)}} className='absolute top-2 right-5'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
              </svg>
            </button>
          </div>
          {errors.password && (<p className='text-red-500 mb-2'>{errors.password.message}</p>)}

          {/* Sign in button */}
          <div>
            <button className='bg-green-500 rounded-md px-5 py-2 w-full mb-2 text-white text-lg' disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign In"}
            </button>
          </div>
        </form>
        <p className='text-center mt-2'>Don't have an account yet ? <NavLink className='text-green-800 text-lg' to={"/signup/student"}>Sign Up</NavLink>.</p>
        <p className='text-center mt-2'>Become a <NavLink className='text-green-800 text-lg' to={"/signup/mentor"}>Mentor</NavLink> with us..</p>
      </div>
    </div>
  )
}

export default SignIn