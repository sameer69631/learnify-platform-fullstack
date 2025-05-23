import AxiosInstances from ".";

const createOrder = (amount, currency, name, description) => {
    return AxiosInstances.post("/payments/create-order", {amount, currency, name, description})
}

const verifyPayment = (response) => {
    return AxiosInstances.post("/payments/verify-payment", response)
}

const getPaymentsByMentorId = (mentorId) => {
    return AxiosInstances.get("/payments/get-payments-mentor-id/"+mentorId)
}
 
const paymentApi = {createOrder, verifyPayment, getPaymentsByMentorId}

export default paymentApi;