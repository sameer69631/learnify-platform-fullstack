import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useUserStore from '../store/userStore'
import { Dropdown, Menu, Avatar } from 'antd'
import { removeToken } from '../helper'
import { GraduationCap } from 'lucide-react';

function Nav() {
    const { user, setUser } = useUserStore()
    const [isMobileOptionOpen, setIsMobileOptionOpen] = useState(false)

    const navigate = useNavigate()
    const signUpMentorBtnClick = () => {
        navigate("/signup/mentor")
    }
    const signUpStudentBtnClick = () => {
        navigate("/signup/student")
    }
    const loginButtonClick = () => {
        navigate("/signin")
    }

    const logoutButtonClick = () => {
        removeToken()
        setUser(null)
        navigate("/")
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <NavLink to={"/dashboard/profile"}>
                    Dashboard
                </NavLink>
            </Menu.Item>

            <Menu.Item>
                <button onClick={logoutButtonClick}>
                    LogOut
                </button>
            </Menu.Item>
        </Menu>
    )

    return (
        <>
            <div className='px-4 py-3 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-14 lg:px-8 shadow-xl rounded-full'>
                <div className='relative flex items-center justify-between'>
                    <div className='flex items-center'>
                        <NavLink to="/" className="inline-flex items-center mr-8">
                            <GraduationCap /><span className='ml-2 text-2xl font-bold text-green-700'>Learnify</span>
                        </NavLink>
                    </div>

                    {/* mobile menue button (hamburger button) for smaller screen */}
                    {!user && <div className='md:hidden flex items-center'>
                        <button className='text-gray-600' onClick={() => setIsMobileOptionOpen(!isMobileOptionOpen)}>
                            <span className='text-2xl '>&#9776;</span>
                        </button>
                    </div>}

                    {/* Desktop navigation to show when user is not logged in */}
                    {!user ? (<ul className={`${isMobileOptionOpen ? "flex flex-col space-y-3 items-center justify-center absolute top-16 w-full z-1 bg-white p-5 rounded-xl" : "hidden space-x-8 md:flex lg:flex items-center"}`}>
                        <li>
                            <button onClick={signUpMentorBtnClick}
                                className='px-4 py-1 font-medium tracking-wide text-gray-800 text-center bg-green-500 rounded-md border-3 border-green-500 hover:bg-green-600 hover:text-white transition-all duration-300'>
                                Become a Mentor with Us
                            </button>
                        </li>
                        <li>
                            <button onClick={loginButtonClick}
                                className='px-4 py-1 font-medium tracking-wide text-gray-800 text-center bg-green-500 rounded-md border-3 border-green-500 hover:bg-green-600 hover:text-white transition-all duration-300'>
                                Sign In
                            </button>
                        </li>
                        <li>
                            <button onClick={signUpStudentBtnClick}
                                className='px-4 py-1 font-medium tracking-wide text-gray-800 text-center bg-green-500 rounded-md border-3 border-green-500 hover:bg-green-600 hover:text-white transition-all duration-300'>
                                Sign Up as Student
                            </button>
                        </li>
                    </ul>) : (
                        <Dropdown overlay={menu} trigger={["hover"]}>
                            <Avatar size={35} style={{ backgroundColor: "#288050", color: "#fff" }}><button>{user.name.charAt(0).toUpperCase()}</button></Avatar>
                        </Dropdown>
                    )
                    }

                </div>
            </div>
        </>
    )
}

export default Nav