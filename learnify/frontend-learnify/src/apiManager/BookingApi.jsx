import AxiosInstances from ".";

const getBookingsByMentorId = async (mentorId) => {
    return await AxiosInstances.get("/bookings/get-bookings-by-mentor/"+mentorId)
}

const getBookingsByStudentId = async (studentId) => {
    return await AxiosInstances.get("/bookings/get-bookings-by-student/"+studentId)
}

const bookingApi = {getBookingsByMentorId, getBookingsByStudentId}

export default bookingApi