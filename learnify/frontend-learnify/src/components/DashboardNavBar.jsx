import React from 'react'
import { removeToken } from '../helper'
import { NavLink, useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import { GraduationCap } from 'lucide-react';

function DashboardNavBar() {
  const navigate = useNavigate()
  const { setUser } = useUserStore()
  return (
    <div className='flex justify-between px-8 py-2 rounded-full shadow-xl'>
      <div className='flex items-center gap-2'>
        <GraduationCap /><NavLink to={"/"}><span className='text-3xl font-extrabold text-green-700'>Learnify</span></NavLink>
      </div>
      <div>
        <button
          className='bg-green-500 hover:bg-green-600 px-5 py-2 rounded-md text-white text-xl font-bold'
          onClick={() => {
            removeToken();
            setUser(null)
            navigate("/");
          }}
        >LogOut</button>
      </div>
    </div>
  )
}

export default DashboardNavBar