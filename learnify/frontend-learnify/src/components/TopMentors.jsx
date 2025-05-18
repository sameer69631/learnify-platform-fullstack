import React, { useEffect, useState } from 'react'
import useMentorStore from '../store/mentorStore';
import mentorApi from '../apiManager/mentorApi';
import { Avatar, Button, Spin } from 'antd'
import { useNavigate } from 'react-router-dom';
import useMentorIdForSessionsStore from '../store/mentorIdForSessions';

function TopMentors() {
  const [topMentors, setTopMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { mentorsData, setMentorsData } = useMentorStore();
  const navigate = useNavigate()
  const {setMentorId} = useMentorIdForSessionsStore()

  const handelMentorLogoClick = (e, mentorId) => {
    e.preventDefault();
    setMentorId(mentorId)
    navigate("/MentorSessions")
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

  return (
    <div>
      <div className='flex flex-wrap gap-5'>
        <Spin spinning={loading}/>
        {topMentors.map((mentor) => (
          <div className='text-center'>
            <Avatar size={180} onClick={(e) => handelMentorLogoClick(e, mentor._id)}>
              <p className='text-[5em]'>{mentor?.name.split(" ").map((data) => data[0].toUpperCase()).join("")}</p>
            </Avatar>
            <p className='mt-2'>{mentor.name.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopMentors;