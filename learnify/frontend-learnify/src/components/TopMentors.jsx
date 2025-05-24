import React, { useEffect, useState } from 'react'
import useMentorStore from '../store/mentorStore';
import mentorApi from '../apiManager/mentorApi';
import { Avatar, Button, Spin } from 'antd'
import { useNavigate } from 'react-router-dom';
import useMentorIdForSessionsStore from '../store/mentorIdForSessions';
import useUserStore from '../store/userStore';
import toast from 'react-hot-toast';

function TopMentors() {
  const [topMentors, setTopMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { mentorsData, setMentorsData } = useMentorStore();
  const navigate = useNavigate()
  const {setMentorId} = useMentorIdForSessionsStore()
  const {user} = useUserStore()

  const handelMentorLogoClick = (e, mentorId) => {
    e.preventDefault();
    if(!user){
      toast.error("Oops! Please sign in before continuing")
    }
    if(user?.role === "student"){
      setMentorId(mentorId)
      navigate("/MentorSessions")
    }
  }

  const selectTopMentors = (mentors) => {
    const selectedTopMentors = [];
    const totalMentors = mentors?.length;

    while (selectedTopMentors.length < 4 && selectedTopMentors.length < totalMentors) {
      const randomIndex = Math.floor(Math.random() * totalMentors);
      if (!selectedTopMentors.includes(mentors[randomIndex])) {
        selectedTopMentors.push(mentors[randomIndex])
      }
    }
    return selectedTopMentors;
  }

  const fetchAllMentors = async () => {
    try {
      const response = await mentorApi.getAllMentors();
      const allMentors = response?.data?.mentors || [];
      setMentorsData(allMentors);
      const selectedTopMentors = selectTopMentors(allMentors);
      setTopMentors(selectedTopMentors);
    }
    catch (err) {
      console.log(err.message)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllMentors();
  }, [])

  const generateAvatarUrl = (name) => {
    const initials = name.split(" ").map((word) => word.charAt(0).toUpperCase()).join("");
    return `https:ui-avatars.com/api/?name=${initials}`
  }

  return (
    <div>
      <div className='flex flex-wrap gap-5'>
        <Spin spinning={loading}/>
        {topMentors.map((mentor, index) => (
          <div key={index} className='text-center'>
            <Avatar onClick={(e) => handelMentorLogoClick(e, mentor._id)}
              size={180}
              src={mentor?.photoUrl || generateAvatarUrl(mentor?.name || "User")}
              className="border-4 border-green-300 shadow-lg cursor-pointer transform hover:scale-110 transition-all"
            />
            <p className='mt-2'>{mentor.name.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopMentors;