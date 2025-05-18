import React from 'react'
import Dashboard from './Dashboard'
import BookingCard from '../../components/BookingCard'
import { useState } from 'react'
import { useEffect } from 'react'
import bookingApi from '../../apiManager/BookingApi'
import useUserStore from '../../store/userStore'
import { useNavigate } from 'react-router-dom'

function StudentBookings() {
  const [upcomingClasses, setUpcomingClasses] = useState([])
  const [pastClasses, setPastClasses] = useState([])
  const [isUpcomingClasses, setIsUpcomingClasses] = useState(true)
  const {user} = useUserStore()
  const navigate = useNavigate()

  useEffect(() => {
    const getBookingsByStudentId = async () => {
      const response = await bookingApi.getBookingsByStudentId(user._id)
      setUpcomingClasses(response.data.allBookings)
    }
    getBookingsByStudentId()
  }, [])

  return (
    <div>
      <Dashboard>
        <div>
          <h1 className='text-2xl font-semibold p-4'>My Bookings</h1>
          <div className='flex gap-5 p-5'>
            <button className={`border px-4 py-1 rounded-md hover:bg-yellow-500 hover:text-white ${isUpcomingClasses && `bg-yellow-300 text-white`}`} onClick={() => setIsUpcomingClasses(true)}>Upcomming Classes</button>
            <button className={`border px-4 py-1 rounded-md hover:bg-yellow-500 hover:text-white ${!isUpcomingClasses && `bg-yellow-300 text-white`}`} onClick={() => setIsUpcomingClasses(false)}>Past Classes</button>
            <button className={`ml-auto border px-4 py-1 rounded-md hover:bg-yellow-500 hover:text-white`} onClick={() => navigate("/all-mentors")}>Book New Class</button>
          </div>

          <BookingCard bookings={isUpcomingClasses ? upcomingClasses : pastClasses} />
        </div>
      </Dashboard>
    </div>
  )
}

export default StudentBookings