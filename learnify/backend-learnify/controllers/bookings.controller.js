const bookingService = require('../services/bookings.service')
const ApiError = require('../helper/apiError');
const httpStatus = require('../utils/httpStatus');

const addBookings = async (req, res, next) => {
    const bookingData = req.body;
    if(!bookingData){
        return next(new ApiError(httpStatus.badRequest, "Required credentials are not found"))
    }
    const addedBookingData = await bookingService.addBookings(bookingData);
    res.status(httpStatus.ok).json({message : "Booking created successfully", addedBookingData})
}

const getBookingsByMentorId = async (req, res, next) => {
    const mentorId = req.params.mentorId;
    if(!mentorId){
        return next(new ApiError(httpStatus.unauthorized, "Authentication credentials are missing"))
    }
    const allBookings = await bookingService.getBookingsByMentorId(mentorId)
    
    res.status(httpStatus.ok).json({message : "Bookings fetched successfully", allBookings})
}

const getBookingsByStudentId = async (req, res, next) => {
    const studentId = req.params.studentId;
    if(!studentId){
        return next(new ApiError(httpStatus.unauthorized, "Authentication credentials are missing"))
    }
    const allBookings = await bookingService.getBookingsByStudentId(studentId)
    res.status(httpStatus.ok).json({message : "Student bookings fetched successfully", allBookings})
}

module.exports = {addBookings, getBookingsByMentorId, getBookingsByStudentId}