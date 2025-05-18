import React from 'react'

function BookingCard({ services }) {
    return (
        <div className='max-w-sm p-5 m-4 shadow-lg rounded-lg flex flex-col justify-center'>
            {services?.map((data) => <div>
                <h1>{data.serviceName}</h1>
                <h1>{data.description}</h1>
                <h1>{data.duration}</h1>
                <h1>{data.price}</h1>
                <h1>{data.active ? "Active" : "Inactive"}</h1>
            </div>)}
        </div>
    )
}

export default BookingCard