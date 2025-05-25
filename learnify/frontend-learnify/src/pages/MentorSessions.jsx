import React, { useEffect, useState } from 'react'
import useMentorIdForSessionsStore from '../store/mentorIdForSessions'
import Nav from '../components/Nav'
import serviceApi from '../apiManager/ServiceApi'
import BookingCard from '../components/BookingCard'
import toast from 'react-hot-toast'
import mentorApi from '../apiManager/mentorApi'
import { Avatar, Spin } from 'antd'
import { AiOutlineUser, AiOutlineMail, AiFillLinkedin, AiFillGithub, AiFillTwitterCircle, AiFillFacebook, AiFillInstagram } from 'react-icons/ai'

function MentorSessions() {
  const { mentorId } = useMentorIdForSessionsStore()
  const [mentorServices, setMentorServices] = useState([])
  const [loading, setLoading] = useState(true)
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
      finally{
        setLoading(false)
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
      finally {
        setLoading(false)
      }
    }

    getServicesByMentor()
    getMentor()
  }, [])

  const generateAvatarUrl = (name) => {
    const initials = name.split(" ").map((word) => word.charAt(0).toUpperCase()).join("");
    return `https:ui-avatars.com/api/?name=${initials}`
  }

  return (
    <div className='max-w-screen-2xl h-screen mx-auto'>
      <div className='sticky top-0 z-50'>
        <Nav />
      </div>
      <div className='md:flex max-w-screen-2xl h-screen mx-auto'>
        <div className='flex flex-col gap-8 md:w-1/4 p-5 mt-4'>
          <Spin spinning={loading}>
            <div className='flex justify-center'>
              <Avatar size={150}
                src={mentor?.photoUrl || generateAvatarUrl(mentor?.name || "User")}
                className="border-4 border-green-300 shadow-lg cursor-pointer transform hover:scale-110 transition-all"
              />
            </div>
          </Spin>
          {/* mentor */}
          <div className='flex flex-col justify-center gap-2 items-center space-y-2'>
            <h3 className='text-green-700 text-2xl tect-center'>{mentor?.name.split(" ").map((data) => data[0].toUpperCase() + data.slice(1)).join(" ")}</h3>
            <h3 className='flex gap-2 items-center tect-center'><AiOutlineUser />Title : {mentor?.profile?.title}</h3>
            <h3>Skills : {mentor?.profile?.tags.map((data, index) => <span key={index} className='bg-gray-200 p-1 rounded-xl mx-1 tect-center'>{data}</span>)}</h3>
            <h3 className='text-center'>Bio : {mentor?.profile?.bio}</h3>
            <h3 className='text-center'>College : {mentor?.profile?.college}</h3>
          </div>

          {/* socials */}
          <div>
            <h1 className='text-yellow-300 text-3xl text-center font-semibold mb-4'>Connect With Me</h1>
            <div className='flex justify-evenly w-full'>
              <a href={mentor?.profile?.social?.linkedin} target='_blank'>
                <AiFillLinkedin className='text-4xl' />
              </a>
              <a href={mentor?.profile?.social?.github} target='_blank'>
                <AiFillGithub className='text-4xl' />
              </a>
              <a href={mentor?.profile?.social?.twitter} target='_blank'>
                <AiFillTwitterCircle className='text-4xl' />
              </a>
              <a href={mentor?.profile?.social?.facebook} target='_blank'>
                <AiFillFacebook className='text-4xl' />
              </a>
              <a href={mentor?.profile?.social?.instagram} target='_blank'>
                <AiFillInstagram className='text-4xl' />
              </a>
            </div>
          </div>
        </div>
        <div className='md:w-3/4 bg-gray-100 h-auto'>
          <h1 className='px-5 py-3 text-4xl font-semibold'>Select Class</h1>
          <div className='flex flex-wrap'>
            <Spin spinning={loading}>
            <BookingCard services={mentorServices}/>

          </Spin>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MentorSessions