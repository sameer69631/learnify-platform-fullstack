import React from 'react'
import { FaPhone, FaEdit, FaRupeeSign } from 'react-icons/fa'

function ServicesCard({ child, onEdit }) {
  return (
    <div className='max-w-sm p-5 m-4 shadow-lg rounded-lg flex flex-col justify-center'>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex gap-3'>
          <FaPhone className='text-purple-600' size={24}/>
        <p className='font-bold'>{child.serviceName}</p>
        </div>
        <button className='bg-red-500 rounded px-3 py-1 text-white font-semibold'>{child.active ? "Active" : "Disabled" }</button>
      </div>
      <p className='text-gray-800 m-2'>{child.description}</p>
      <div className='flex items-center justify-between px-3'>
        <p className='flex items-center font-bold text-gray-800'>Price : <FaRupeeSign/>{child.price}</p>
        <p className='flex items-center font-bold text-gray-800'>Duration : {child.duration} mins.</p>
      </div>
      <div className='flex justify-end m-2'><button onClick={onEdit} className='flex items-center gap-1 rounded-md px-2 text-blue-700'><FaEdit size={16}/>  Edit</button></div>
    </div>
  )
}

export default ServicesCard