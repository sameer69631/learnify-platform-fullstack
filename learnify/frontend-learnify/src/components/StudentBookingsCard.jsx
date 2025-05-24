import React from 'react'
import { FaPhone, FaEdit, FaRupeeSign } from 'react-icons/fa'

function StudentBookingsCard({ bookings }) {
    
    return (
        <div className='flex flex-wrap'>
            {bookings.map((booking, index) => <div key={index} className='max-w-sm p-5 m-4 shadow-lg rounded-lg'>
                <h1>Service Name : {booking.serviceName}</h1>
                <p>Date (MM : DD : YYYY) : {booking.date}</p>
                <p>Time : {booking.time}</p>
            </div>)}
        </div>
    )
}

export default StudentBookingsCard


