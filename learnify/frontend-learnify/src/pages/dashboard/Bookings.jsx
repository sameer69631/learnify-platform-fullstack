import React from 'react'
import Dashboard from './Dashboard'
import BookingsTable from '../../components/BookingsTable'
import { useState } from 'react'
import bookingApi from '../../apiManager/BookingApi'
import { useEffect } from 'react'
import useUserStore from '../../store/userStore'
import toast from 'react-hot-toast'

function Bookings() {
  const { user } = useUserStore()
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const [pastBookings, setPastBookings] = useState([])
  const [isUpcomingBooking, setIsUpcommingBooking] = useState(true)

  useEffect(() => {
    const getBookingsByMentorId = async () => {
      try {
        const mentorId = user._id;
        const response = await bookingApi.getBookingsByMentorId(mentorId)
        setUpcomingBookings(response.data.allBookings)
      }
      catch (err) {
        console.log("Unable to get bookings : ", err.message)
        toast.error("Unable to get bookings")
      }
    }
    getBookingsByMentorId()
  }, [])

  return (
    <div>
      <Dashboard>
        <h1 className='text-2xl font-semibold p-4'>Your Bookings</h1>
        <div className='flex gap-5 p-5'>
          <button className={`border px-4 py-1 rounded-md hover:bg-yellow-400 hover:text-white ${isUpcomingBooking && `bg-yellow-300 text-white`}`} onClick={() => setIsUpcommingBooking(true)}>Upcomming Bookings</button>
          <button className={`border px-4 py-1 rounded-md hover:bg-yellow-400 hover:text-white ${!isUpcomingBooking && `bg-yellow-300 text-white`}`} onClick={() => setIsUpcommingBooking(false)}>Past Bookings</button>
        </div>
        <div>
          <BookingsTable bookings={isUpcomingBooking ? upcomingBookings : pastBookings} />
        </div>
      </Dashboard>
    </div>
  )
}

export default Bookings