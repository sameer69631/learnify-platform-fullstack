import AxiosInstances from "."

const getAllMentors = () => {
    return AxiosInstances.get("/mentor")
}

const getMentorsByUserName = (username) => {
    return AxiosInstances.get("/mentor/"+username)
}

const getMentorById = (mentorId) => {
    return AxiosInstances.get("/mentor/get-mentor-by-id/"+mentorId)
}

const mentorApi = {
    getAllMentors, getMentorsByUserName, getMentorById
}

export default mentorApi