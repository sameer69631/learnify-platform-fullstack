import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import { Modal, Form, Input, Button, Spin, Radio, DatePicker, TimePicker } from "antd"
import useUserStore from '../../store/userStore'
import serviceApi from '../../apiManager/ServiceApi'
import toast from 'react-hot-toast'
import ServicesCard from '../../components/ServicesCard'
import dayjs from 'dayjs'

function Services() {
    const [allServices, setAllServices] = useState([])
    const [isModalActive, setIsModalActive] = useState(false)
    const [editingService, setEditingService] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { user: mentor } = useUserStore()

    const [form] = Form.useForm()
    // useEffect insteat initial values of form to handle dynamic data
    useEffect(() => {
        if(editingService){
            form.setFieldsValue(editingService)
        }
        else{
            form.resetFields();
        }
    },[editingService])

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await serviceApi.getServiceByMentor(mentor._id)
                setAllServices(response?.data?.services || [])
            }
            catch (err) {
                console.log("Unable to get services", err.message)
                toast.error("Unable to get services")
            }
        }

        fetchServices();
    }, [])

    const handleCreateService = async (values) => {
        const serviceData = {
            mentor: mentor._id,
            serviceName: values.serviceName,
            description: values.description,
            duration: values.duration,
            price: values.price,startDate : values.startDate,
            endDate : values.closingDate,
            startTime : values.startTime,
            endTime : values.endTime,
            active: values.active
        }
        setIsLoading(true)

        try {
            console.log("start date is : ",serviceData.startDate)
            const response = await serviceApi.addService(serviceData);
            setAllServices((previousService) => [...previousService, response.data?.createdService]);
            setIsModalActive(false)
            setIsLoading(false)
            toast.success("Service added successfully")
        }
        catch (err) {
            console.log("Failed to add service", err.message)
            setIsLoading(false)
            toast.error("Unable to add service")
        }
    }

    const handelEditService = async (values) => {
        const updatedServiceData = {
            mentor: mentor._id,
            serviceName: values.serviceName,
            description: values.description,
            duration: values.duration,
            price: values.price,
            startDate : values.startDate,
            endDate : values.closingDate,
            startTime : values.startTime,
            endTime : values.endTime,
            active: values.active
        }
        setIsLoading(true)
        try {
            const response = await serviceApi.updateService(editingService._id, updatedServiceData)
            setAllServices((previousService) => previousService.map((service) => service._id === editingService._id ? response.data.updatedService : service))

            setEditingService(null)
            setIsModalActive(false)
            setIsLoading(false)
            toast.success("Service updated successfully")
        }
        catch (err) {
            console.log(err.message);
            setIsLoading(false);
            toast.error("Unable to edit service")
        }
    }

    const handleEdit =async (service) => {
        const response = await serviceApi.getServiceById(service._id);
        const resService = response.data.service;
        const newService = {...service, startDate:dayjs(resService.startDate), endDate:dayjs(resService.endDate), startTime:dayjs(resService.startTime), endTime:dayjs(resService.endTime)}
        setEditingService(newService);
        setIsModalActive(true)
    }

    return (
        <Dashboard>
            <div className=''>
                <nav className='flex justify-between items-center px-8 py-2'>
                    <h1 className='text-2xl font-semibold'>Your Services</h1>
                    <div><button className='bg-blue-600 px-4 py-2 rounded-lg text-bold text-white'
                        onClick={() => { setIsModalActive(true) }}
                    >+ Add New</button></div>
                </nav>

                <Spin spinning={isLoading}>
                    <div className='flex flex-wrap'>
                        {allServices?.map((service, index) => (
                            <ServicesCard key={index} child={service} onEdit={() => (handleEdit(service))} />
                        ))}
                    </div>
                </Spin>

                <Modal title={editingService ? "Edit Service" : "Create New Service"} open={isModalActive} onCancel={() => {
                    form.resetFields();
                    setEditingService(null);
                    setIsModalActive(false);
                }} footer={null}>
                    <Form form={form} onFinish={editingService ? handelEditService : handleCreateService} layout='vertical'>
                        <Form.Item label="Service Name" name={"serviceName"} rules={[{ required: true, message: "Service name is required" }]}>
                            <Input placeholder="Enter service name" />
                        </Form.Item>

                        <Form.Item label="Description" name={"description"} rules={[{ required: true, message: "Description is required" }]}>
                            <Input.TextArea placeholder='Describe the service' />
                        </Form.Item>

                        <Form.Item label="Duration" name={"duration"} rules={[{ required: true, message: "Enter duration" }]}>
                            <Input placeholder='Enter Duration in minutes' />
                        </Form.Item>

                        <Form.Item label="Price" name={"price"} rules={[{ required: true, message: "Price is required" }]}>
                            <Input placeholder='Enter price' />
                        </Form.Item>
                        <Form.Item><p>Enter date in between you are free to take sessions</p></Form.Item>
                        <Form.Item label="Start Date" name={"startDate"} rules={[{ required: true, message: "Start date is required" }]}>
                            <DatePicker placeholder='Enter start date'/>
                        </Form.Item>

                        <Form.Item label="Closing Date" name={"closingDate"} rules={[{ required: false }]}>
                            <DatePicker placeholder='Enter closing date'/>
                        </Form.Item>
                        <Form.Item><p>Enter time in between you are free to take sessions</p></Form.Item>
                        <Form.Item label="Start Time" name={"startTime"} rules={[{ required: true, message:"Start time is required" }]}>
                            <TimePicker placeholder='Enter start time'/>
                        </Form.Item>

                        <Form.Item label="End Time" name={"endTime"} rules={[{ required: false }]}>
                            <TimePicker placeholder='Enter end time'/>
                        </Form.Item>

                        <Form.Item label="Active" name={"active"} rules={[{ required: true, message: "Active is required" }]}>
                            <Radio.Group>
                                <Radio value={true}>true</Radio>
                                <Radio value={false}>false</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item>
                            <Button type='primary' htmlType='submit'>{editingService ? "Save Changes" : "Create Service"}</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </Dashboard>
    )
}

export default Services