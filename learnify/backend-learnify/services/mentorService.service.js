const mentorServicesModel = require('../models/service.model')

const addService = async (data) => {
    return await mentorServicesModel.create(data)
}

const getServiceByMentor = async (mentorId) => {
    return await mentorServicesModel.find({mentor:mentorId})
}

const getServiceById = async (serviceId) => {
    return await mentorServicesModel.findOne({_id:serviceId})
}

const updateService = async (id, data) => {
    return await mentorServicesModel.findByIdAndUpdate(id, data, {new : true})
}

module.exports = {addService, getServiceByMentor, updateService, getServiceById}