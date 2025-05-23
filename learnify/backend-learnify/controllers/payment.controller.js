const crypto = require('crypto')
const Razorpay = require('razorpay')
const httpStatus = require('../utils/httpStatus')
const {addBookings} = require('./bookings.controller')
const ApiError = require('../helper/apiError')
const paymentsService = require('../services/payments.service')

require('dotenv').config()

const razorpayInstance = new Razorpay({
    key_id : process.env.RAZORPAY_KEY,
    key_secret : process.env.RAZORPAY_SECRET
})

const createOrder = async (req, res) => {
    try{
        const {amount, currency, name, description} = req.body;
        if(!amount || !currency || !name || !description){
            res.status(httpStatus.badRequest).json({success : false, message : "Required credentials are missing"})
        }

        const amountInPaisa = amount*100;
        const options = {
            amount : amountInPaisa,
            currency : "INR",
            receipt : `recipt_${new Date().getTime()}`,
            notes : {
                name,
                description
            }
        }

        razorpayInstance.orders.create(options, (err, order)=>{
            if(err){
                return res.status(httpStatus.badRequest).json({success : false, message : "Missing details", error : err})
            }

            res.status(httpStatus.ok).send({
                success : true,
                order_id : order.id,
                amount : amountInPaisa,
                key_id : process.env.RAZORPAY_KEY,
                product_name : name,
                description,
                contact : "",
                name : "user name",
                email : "user email"
            })
        })
    }
    catch(err){
        console.log("Razorpay error", err.message)
        res.status(httpStatus.internalServerError).send({success : false, message : "Server error"})
    }
}

const verifyPayment = (req, res) => {
    const payload = req.body
    const body = payload.orderId + "|" + payload.paymentId
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body).digest("hex");
    if(expectedSignature === payload.signature){
        const bookingPayload = {
            mentorId : payload.mentorId,
            serviceId : payload.serviceId,
            studentId : payload.studentId,
            serviceName : payload.serviceName,
            date : payload.date,
            time : payload.time,
            price : payload.price
        }
        addBookings(bookingPayload)
        const paymentPayload = {
            mentorId : payload.mentorId,
            studentId : payload.studentId,
            serviceName : payload.serviceName,
            studentName : payload.studentName,
            dateAndTime : new Date(),
            price : payload.price
        }
        addPaymentData(paymentPayload)
        return res.status(httpStatus.ok).send({success : true})
    }
    else{
        console.log("entered else block")
        return res.status(httpStatus.unauthorized).send({success : false})
    }
}

const addPaymentData = (paymentData) => {
    if(!paymentData){
        return new ApiError(httpStatus.unauthorized, "Required details are missing")
    }
    const payments = paymentsService.addPaymentData(paymentData)
}

const getPaymentsByMentorId = async (req, res) => {
    const mentorId = req.params.mentorId
    if(!mentorId){
        res.status(httpStatus.unauthorized).json({success : false, message : "Required credentials are missing"})
    }
    const payments = await paymentsService.getPaymentDataByMentorId(mentorId)

    res.status(httpStatus.ok).json({message : "Payments fetched successfully", payments})
}

module.exports = {createOrder, verifyPayment, getPaymentsByMentorId}