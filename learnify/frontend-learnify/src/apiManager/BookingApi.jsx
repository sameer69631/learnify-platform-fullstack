import AxiosInstances from ".";

const addBooking = async (booking) => {
    return await AxiosInstances.post("bookings/add-booking", booking)
}

const getBookingsByMentorId = async (mentorId) => {
    return await AxiosInstances.get("bookings/get-bookings-by-mentor/"+mentorId)
}

const getBookingsByStudentId = async (studentId) => {
    return await AxiosInstances.get("bookings/get-bookings-by-student/"+studentId)
}

const bookingApi = {addBooking, getBookingsByMentorId, getBookingsByStudentId}

export default bookingApi