const paymentModel = require('../models/payments.model')

const addPaymentData =async (paymentData) => {
    return await paymentModel.create(paymentData)
}

const getPaymentDataByMentorId = async (mentorId) => {
    return await paymentModel.find({mentorId : mentorId})
}

module.exports = {addPaymentData, getPaymentDataByMentorId}