import React from 'react'
import { Avatar } from 'antd'
import useUserStore from '../store/userStore'
import { NavLink } from 'react-router-dom'

function SideBar() {
  const { user, setUser } = useUserStore()

  const generateAvatarUrl = (name) => {
    const initials = user.name.split(" ").map((data) => data.charAt(0).toUpperCase()).join("");
    return `https:ui-avatars.com/api/?name=${initials}`
  }

  return (
    <div className='min-w-1/5 p-8 bg-green-50 flex flex-col items-center gap-2'>
      <Avatar size={180} src={user.photoUrl || generateAvatarUrl(user.name || "User")}/>
      <p>{user.name.toUpperCase()}</p>
      <p>{user.email}</p>
      <div className='mt-3 w-full'>
        <NavLink to={"/dashboard/profile"}><p className='hover:bg-yellow-300 text-xl text-black text-center rounded-md w-full border-2 border-green-200 py-1 px-2 mt-3'>Profile</p></NavLink>

        {user.role != "mentor" && <NavLink to={"/dashboard/studentBookings"}><p className='hover:bg-yellow-300 text-xl text-black text-center rounded-md w-full border-2 border-green-200 py-1 px-2 mt-3'>My Bookings</p></NavLink>}
        {(user.role == "mentor") && (
          <div>
            <NavLink to={"/dashboard/services"}><p className='hover:bg-yellow-300 text-xl text-black text-center rounded-md w-full border-2 border-green-200 py-1 px-2 mt-3'>Services</p></NavLink>

            <NavLink to={"/dashboard/bookings"}><p className='hover:bg-yellow-300 text-xl text-black text-center rounded-md w-full border-2 border-green-200 py-1 px-2 mt-3'>Bookings</p></NavLink>

            <NavLink to={"/dashboard/paymentsInfo"}><p className='hover:bg-yellow-300 text-xl text-black text-center rounded-md w-full border-2 border-green-200 py-1 px-2 mt-3'>Payments</p></NavLink>
          </div>
        )}
      </div>
    </div>
  )
}

export default SideBar