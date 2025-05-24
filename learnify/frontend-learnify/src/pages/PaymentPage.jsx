import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs';
import paymentApi from '../apiManager/PaymentApi';
import { useEffect } from 'react';
import bookingApi from '../apiManager/BookingApi';
import toast from 'react-hot-toast';

function PaymentPage() {
  const location = useLocation()
  const { mentorId, serviceId, studentId, studentName, serviceName, price, date, time } = location.state || {};
  const parsedDate = date ? dayjs(date.$d || date) : null;
  const [mobileNumber, setMobileNumber] = useState()
  const [orderId, setOrderId] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => console.log("Razorpay script loaded successfully");
      script.onerror = () => console.error("Failed to load Razorpay script");
      document.body.appendChild(script);
      const abc = new Date(parsedDate).toLocaleDateString()
    }
  }, []);

  const habdleProceedToPay = async (amount, currency, name, description) => {
    if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    try {
      const response = await paymentApi.createOrder(amount, currency, name, description)
      const order = response?.data;
      if (!response || !order.order_id) {
        alert("Failed to create order")
        return
      }
      setOrderId(order.order_id)

      const options = {
        key: order.key_id,
        amount: price * 100,
        currency: "INR",
        order_id: order.order_id,
        name: "Learnify",
        description: `Payment for slot on date ${dayjs(parsedDate).format("DD/MM/YYYY")} time ${time}`,
        prefill: {
          contact: mobileNumber
        },
        handler: async (response) => {
          const payload = {
            orderId : response.razorpay_order_id,
            paymentId : response.razorpay_payment_id,
            signature : response.razorpay_signature,
            mentorId, serviceId, studentId, studentName, serviceName, price, date : new Date(parsedDate).toLocaleDateString(), time
          }
          const verification = await paymentApi.verifyPayment(payload);
          if (verification.data && verification.data.success) {
            toast.success("Payment successful and verified")
            navigate("/dashboard/studentBookings")
          }
          else {
            alert("Payment unsuccessful varification failed")
          }
        },
        theme: {
          color: "#3399cc",
        },
      }
      if (!window.Razorpay) {
        console.log("Razorpay is not loaded")
        return
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    }
    catch (err) {
      console.log("Payment error : ", err)
      alert("Payment failed : ", err.message)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col gap-5 max-w-lg shadow-lg rounded-xl px-10 py-5'>
        <h1 className='text-2xl font-bold text-center'>Confirm Payment</h1>
        <div className='bg-blue-50 rounded-xl px-5 py-2'>
          <h1 className='text-lg'>Service Name : {serviceName}</h1>
          <p>Price : &#8377; {price}</p>
          <p>Date: {parsedDate ? dayjs(parsedDate).format("DD/MM/YYYY") : "No date"}</p>
          <p>Time : {time}</p>
        </div>
        <div>
          <label htmlFor="mobile-number">Enter Mobile Number</label>
          <input type="tel" id='mobile-number' maxLength={10}
            className='border px-4 py-1 w-full rounded'
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder='Enter 10-digit mobile number'
          />
        </div>
        <button className='bg-green-500 hover:bg-green-6000 text-white font-semibold rounded p-2'
          onClick={() => habdleProceedToPay(price, "INR", serviceName, `Payment for slot on date ${dayjs(parsedDate).format("DD/MM/YYYY")} time ${time}`)}>
          Proceed To Pay &#8377;{price}
        </button>
      </div>
    </div>
  )
}

export default PaymentPage