const express = require('express')
const {protect, restrictTo} = require('../../middleware/auth')
const assyncHandler = require('../../helper/asyncHandler')
const bookingController = require('../../controllers/bookings.controller');
const asyncHandler = require('../../helper/asyncHandler');

const router = express.Router();

router.post("/add-booking", protect, assyncHandler(bookingController.addBookings))
router.get("/get-bookings-by-mentor/:mentorId", protect, asyncHandler(bookingController.getBookingsByMentorId))
router.get("/get-bookings-by-student/:studentId", protect, asyncHandler(bookingController.getBookingsByStudentId))

module.exports = router;