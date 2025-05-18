import React, { useEffect, useState } from 'react'
import mentorApi from '../apiManager/mentorApi'
import toast from 'react-hot-toast'
import { Spin, Avatar } from 'antd'

function AllMentors() {
  const [allMentors, setAllMentors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAllMentors = async () => {
      try {
        const response = await mentorApi.getAllMentors()
        setAllMentors(response.data.mentors)
      }
      catch (err) {
        console.log("Unable to get mentors : ", err.message)
        toast.error("Unable to get mentors")
      }
      finally {
        setLoading(false)
      }
    }

    getAllMentors()
  }, [])

  const generateProfileUrl = (mentor) => {
    const initials = mentor.name.split(" ").map((data) => data[0].toUpperCase()).join("");
    return `https:ui-avatars.com/api/?name=${initials}`
  }

  return (
    <div className='max-w-screen-xl px-6 py-3'>
      <div className='text-center'>
        <h1 className='text-4xl text-green-700 font-bold p-4'>Select Mentor</h1>
        <Spin spinning={loading} />
        <div className='flex flex-wrap gap-5 mt-4'>
          {allMentors.map((mentor) => (
            <div className='text-center'>
              <Avatar size={180} src={mentor?.photoUrl || generateProfileUrl(mentor)}/>
              <p className='mt-2'>{mentor.name.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllMentors