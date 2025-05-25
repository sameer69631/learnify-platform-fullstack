import React, { useState } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import { FaRupeeSign } from 'react-icons/fa'
import { Modal, Form, DatePicker, Select, Button } from 'antd'
import useUserStore from '../store/userStore'

import dayjs from 'dayjs'
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useNavigate } from 'react-router-dom'
dayjs.extend(isSameOrBefore)

function BookingCard({ services }) {
    const [isBooking, setIsBooking] = useState(false)
    const [selectedService, setSelectedService] = useState(null)
    const {user} = useUserStore()
    const navigate = useNavigate()

    const [form] = Form.useForm();

    const handleBookingClick = (service) => {
        setSelectedService(service)
    }

    const generateTimeSlot = (startTime, endTime, durationMinutes) => {
        let start = dayjs(startTime)
        let end = dayjs(endTime)

        const slots = []
        while (start.isBefore(end)) {
            const nextSlotEnd = start.add(durationMinutes, "minute")
            if (nextSlotEnd.isAfter(end)) break;

            const slotStart = start.format("HH:mm")
            const slotEnd = nextSlotEnd.format("HH:mm")
            const slotToPush = `${slotStart} - ${slotEnd}`;
            slots.push(slotToPush)
            start = nextSlotEnd
        }
        return slots;
    }

    const handelBookingPayment = (values) => {
        navigate("/paymentsPage", {
            state : {
                mentorId : selectedService.mentor,
                serviceId : selectedService._id,
                studentId : user._id,
                studentName : user.name,
                serviceName : selectedService?.serviceName,
                price : selectedService?.price,
                date : values.bookingDate,
                time : values.time,
            }
        })
    }

    const timeSlots = generateTimeSlot(selectedService?.startTime, selectedService?.endTime, selectedService?.duration)
    return (
        <div className='flex flex-wrap justify-center'>
            {services?.map((data, index) => <div key={index} className='group flex flex-col justify-evenly max-w-md px-3 py-3 m-4 shadow-lg rounded-xl'>
                <h1 className='text-xl font-bold py-2'>{data.serviceName}</h1>
                <h1>{data.description}</h1>
                <div className='mt-1 mb-1'>
                    <p className='flex items-center font-bold text-gray-800'>Bookings Between : {new Date(data.startDate).toLocaleDateString("en-GB")} - {new Date(data.endDate).toLocaleDateString("en-GB")}</p>
                    <p className='flex items-center font-bold text-gray-800'>Timing : {new Date(data.startTime).toLocaleTimeString()} - {new Date(data.endTime).toLocaleTimeString()}</p>
                </div>
                <div className='flex bg-gray-200 group-hover:bg-gray-300 items-center rounded-xl py-2 mt-1'>
                    <AiOutlineCalendar size={40} className='p-1 ml-1' />
                    <div className='ml-2'>
                        <h1 className='font-bold'>{data.duration} mins</h1>
                        <span className='text-sm'>Video Meeting</span>
                    </div>
                    <h1 className='flex items-center hover:bg-black hover:text-white text-lg font-bold rounded-3xl border ml-auto px-3 py-1 mr-2' onClick={() => { setIsBooking(true), handleBookingClick(data) }}>
                        <span className='rounded-full bg-gray-200 text-green-700 border p-1 mr-2 flex items-center justify-center text-xl'><FaRupeeSign /></span>
                        <span>&#8377;{data.price} 	&#8658;</span>
                    </h1>
                </div>
            </div>)}

            <Modal open={isBooking} onCancel={() => setIsBooking(false)} footer={null}>
                <Form form={form} onFinish={handelBookingPayment}>
                    <h1 className='text-xl font-bold py-2'>{selectedService?.serviceName}</h1>
                    <h1 className='text-xl font-bold py-2'>&#8377;{selectedService?.price}</h1>
                    <p>Bookings Between : {new Date(selectedService?.startDate).toLocaleDateString("en-GB")} - {new Date(selectedService?.endDate).toLocaleDateString("en-GB")}</p>
                    <Form.Item label="Date" name={"bookingDate"} rules={[{ required: true, message: "Date is required" }]}>
                        <DatePicker placeholder='Enter Date' format="DD : MM : YYYY"/>
                    </Form.Item>
                    <Form.Item label="Time" name={"time"} rules={[{ required: true, message: "Time is required" }]}>
                        <Select placeholder="Select time">
                            {timeSlots.map((timing, index) => (<Select.Option key={index} value={timing}>{timing}</Select.Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' className='mt-3 w-full'>Make Payment</Button>
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    )
}

export default BookingCard