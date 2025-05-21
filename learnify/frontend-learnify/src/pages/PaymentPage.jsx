import React from 'react'
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs';

function PaymentPage() {
  const location = useLocation()
  const {serviceName, price, date, time} = location.state || {};
  const parsedDate = date ? dayjs(date.$d || date) : null;
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col gap-5 max-w-lg shadow-lg rounded-xl px-10 py-5'>
        <h1 className='text-2xl font-bold text-center'>Confirm Payment</h1>
        <h1 className='text-lg'>Service Name : {serviceName}</h1>
        <p>Price : &#8377; {price}</p>
        <p>Date: {parsedDate ? dayjs(parsedDate).format("DD/MM/YYYY") : "No date"}</p>
        <p>Time : {time}</p>
        <button className='bg-green-500 hover:bg-green-6000 text-white font-semibold rounded p-2'>Proceed To Pay &#8377;{price}</button>
      </div>
    </div>
  )
}

export default PaymentPage