import React from 'react'
import { removeToken } from '../helper'
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';

function DashboardNavBar() {
    const navigate = useNavigate()
    const {setUser} = useUserStore()
  return (
    <div className='flex justify-between p-4 bg-green-50'>
        <p className='text-5xl font-extrabold text-yellow-700'>Learnify</p>
        <div>
            <button 
            className='bg-yellow-600 px-5 py-2 rounded-md text-white text-xl font-bold'
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