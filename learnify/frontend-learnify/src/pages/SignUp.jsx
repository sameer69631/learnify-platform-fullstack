import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import auth from "../apiManager/AuthApi"
import toast from 'react-hot-toast';

function SignUp() {
    const { role } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [hidePassword, setHidePassword] = useState(false)

    const toggleHidePassword = (e) => {
        e.preventDefault();
        setHidePassword(!hidePassword)
    }

    const submitSignUpForm = async (data) => {
        setIsLoading(true);
        const formData = {
            ...data,
            role
        }
        try {
            const response = await auth.signup(formData);
            console.log(response.data)
            reset()
            toast.success("account created successfully")
            navigate("/signin")
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className='h-screen bg-green-100 flex flex-col items-center justify-center'>
                <div className='w-full max-w-lg bg-white rounded-lg px-5 py-10'>
                    <div className='text-center'>
                        <h1 className='font-bold text-4xl mb-1'>{role === "mentor" ? "Sign Up as Mentor" : "Sign Up as Student"}</h1>
                        <p className='text-sm text-gray-700 mb-2'>Sign up to create your account</p>
                    </div>
                    {/* form inputs */}
                    <form className='text-center' onSubmit={handleSubmit(submitSignUpForm)}>
                        <div>
                            <input type="text" className={`block border px-5 py-2 rounded-lg w-full bg-gray-100 placeholder-gray-600 focus:ring focus:ring-green-300 focus:outline-none mb-3 ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                                placeholder='Enter your Name' {...register("name", { required: "name is required" })} />
                        </div>
                        {errors.name && (
                            <p className='text-red-600'>{errors.name.message}</p>
                        )}

                        <div>
                            <input type="email" className={`block border px-5 py-2 rounded-lg w-full bg-gray-100 placeholder-gray-600 focus:ring focus:ring-green-300 focus:outline-none mb-3 ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                                placeholder='Enter your Email' {...register("email", {
                                    required: "email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "invalid email address"
                                    }
                                })} />
                        </div>
                        {errors.email && (
                            <p className='text-red-600'>{errors.email.message}</p>
                        )}
                        <div>
                            <input type="text" className={`block border px-5 py-2 rounded-lg w-full bg-gray-100 placeholder-gray-600 focus:ring focus:ring-green-300 focus:outline-none mb-3 ${errors.userName ? 'border-red-400' : 'border-gray-300'}`}
                                placeholder='Enter your User Name' {...register("username", {
                                    required: "user name is required",
                                    minLength: {
                                        value: 4,
                                        message: "user name must be atleast four characters long"
                                    }
                                })} />
                        </div>
                        {errors.userName && (
                            <p className='text-red-600'>{errors.username.message}</p>
                        )}
                        <div className='relative'>
                            <input type={`${hidePassword ? "text" : "password"}`} className={`block border px-5 py-2 rounded-lg w-full bg-gray-100 placeholder-gray-600 focus:ring focus:ring-green-300 focus:outline-none mb-3 ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
                                placeholder='Enter Password' {...register("password", {
                                    required: "password is required",
                                    minLength: {
                                        value: 6,
                                        message: "password must be atleast six characters long"
                                    }
                                    // pattern:{
                                    //     value:/^[A-Z0-9]
                                    // }
                                })} />
                            <button onClick={(e) => { toggleHidePassword(e) }} className='absolute top-2 right-5'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                                </svg>
                            </button>
                        </div>
                        {errors.password && (
                            <p className='text-red-600'>{errors.password.message}</p>
                        )}
                        <div>
                            <button className='bg-green-500 rounded-md px-5 py-2 w-full mb-2 text-white text-xl' disabled={isLoading}>
                                {isLoading ? "Loading..." : "Sign Up"}
                            </button>
                        </div>
                    </form>
                    <p className='text-center'>Already have an account ? <NavLink className='text-green-800 text-xl' to={"/signin"}>Sign In</NavLink>.</p>

                </div>
            </div>
        </>
    )
}

export default SignUp