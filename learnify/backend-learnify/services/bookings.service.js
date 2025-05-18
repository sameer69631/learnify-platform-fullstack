const bookingModel = require('../models/bookings.model')

const addBookings = async (booking) => {
    return await bookingModel.create(booking);
}

const cancelBooking = async (bookingId) => {
    return await bookingModel.deleteOne({_id:bookingId});
}

const getBookingsByMentorId = async (mentorId) => {
    return await bookingModel.find({mentorId:mentorId});
}

const getBookingsByStudentId = async (studentId) => {
    return await bookingModel.find({studentId : studentId})
}

module.exports = {addBookings, cancelBooking, getBookingsByMentorId, getBookingsByStudentId}