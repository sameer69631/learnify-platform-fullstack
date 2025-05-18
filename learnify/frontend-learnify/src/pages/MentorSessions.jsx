import React, { useEffect, useState } from 'react'
import useMentorIdForSessionsStore from '../store/mentorIdForSessions'
import serviceApi from '../apiManager/ServiceApi'
import BookingCard from '../components/BookingCard'
import DashboardNavBar from '../components/DashboardNavBar'
import toast from 'react-hot-toast'
import userApi from '../apiManager/UserApi'
import mentorApi from '../apiManager/mentorApi'

function MentorSessions() {
  const { mentorId } = useMentorIdForSessionsStore()
  const [mentorServices, setMentorServices] = useState([])
  const [mentor, setMentor] = useState()

  useEffect(() => {
    const getServicesByMentor = async () => {
      try {
        const response = await serviceApi.getServiceByMentor(mentorId);
        setMentorServices(response.data.services)
      }
      catch (err) {
        console.log("Unable to get services : ", err.message);
        toast("Unable to get services")
      }
    }

    const getMentor = async () => {
      try {
        const response = await mentorApi.getMentorById(mentorId)
        setMentor(response.data.mentor)
      }
      catch (err) {
        console.log("Unable to get mentor : ", err.message)
        toast("Unable to get mentor")
      }
    }

    getServicesByMentor()
  }, [])

  return (
    <div>
      <DashboardNavBar />
      <div>
        <div>

        </div>
        <div>
          <h1>Select Class</h1>
          <BookingCard services={mentorServices} />
        </div>
      </div>
    </div>
  )
}

export default MentorSessions