import React from 'react';
import { FiBox } from 'react-icons/fi';

function BookingsTable({bookings}) {
    return (
        <div className='p-5'>
            <table className='w-full height-auto shadow-lg'>
                <thead>
                    <tr className='text-left'>
                        <th className='px-4 py-2 bg-gray-200'>Service Name</th>
                        <th className='px-4 py-2 bg-gray-200'>Date</th>
                        <th className='px-4 py-2 bg-gray-200'>Time</th>
                        <th className='px-4 py-2 bg-gray-200'>Status</th>
                        <th className='px-4 py-2 bg-gray-200'>Price</th>
                    </tr>
                </thead>
                {bookings?.length > 0 && <tbody>
                    {bookings.map((data) => (
                        <tr>                                                     
                            <td key={data.serviceName} className='p-2'>{data.serviceName}</td>
                            <td key={data.date} className='p-2'>{data.date}</td>
                            <td key={"set time"} className='p-2'>{data.time}</td>
                            <td key={data.status} className='p-2'>{data.status ? <span className='text-green-700'>Active</span> : <span className='text-red-600'>Inactive</span>}</td>
                            <td key={data.price} className='p-2'>{data.price}</td>
                        </tr>
                    ))}
                </tbody>}
            </table>
            {bookings?.length < 1 && <div className='flex flex-col justify-center items-center h-full p-10'>
                <FiBox size={120} className='m-3'/>
                <p className='text-lg font-semibold p-2'>No Data</p>
            </div>}
        </div>
    )
}

export default BookingsTable