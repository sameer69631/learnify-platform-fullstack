const express = require('express')
const paymentController = require('../../controllers/payment.controller')
const asyncHandler = require('../../helper/asyncHandler')

const router = express.Router()

router.post("/create-order",asyncHandler(paymentController.createOrder))
router.post("/verify-payment",asyncHandler(paymentController.verifyPayment))
router.get("/get-payments-mentor-id/:mentorId", asyncHandler(paymentController.getPaymentsByMentorId))

module.exports = router;