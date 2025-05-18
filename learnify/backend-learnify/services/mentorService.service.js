const mentorServicesModel = require('../models/service.model')

const addService = async (data) => {
    return await mentorServicesModel.create(data)
}

const getServiceByMentor = async (mentorId) => {
    return await mentorServicesModel.find({mentor:mentorId})
}

const updateService = async (id, data) => {
    return await mentorServicesModel.findByIdAndUpdate(id, data, {new : true})
}

module.exports = {addService, getServiceByMentor, updateService}