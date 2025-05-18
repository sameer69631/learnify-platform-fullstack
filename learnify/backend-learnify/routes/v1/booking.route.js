const express = require('express')
const {protect, restrictTo} = require('../../middleware/auth')
const bookingController = require('../../controllers/bookings.controller')

const router = express.Router();

router.post("/add-booking", protect, bookingController.addBookings)
router.get("/get-bookings-by-mentor/:mentorId", protect, bookingController.getBookingsByMentorId)
router.get("/get-bookings-by-student/:studentId", protect, bookingController.getBookingsByStudentId)

module.exports = router;