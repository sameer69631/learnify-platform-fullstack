const ApiError = require('../helper/apiError');
const mentorServicesService = require('../services/mentorService.service')
const httpStatus = require('../utils/httpStatus');
const { message } = require('../validations/user.validations');

const addService = async (req, res, next) => {
        const service = req.body;
        if(!service){
            return next(new ApiError(httpStatus.badRequest, "No input found"))
        }
        const createdService = await mentorServicesService.addService(service);
        res.status(httpStatus.ok).json({message : "Service has been created", createdService})
}

const updateService = async (req, res, next) => {
    const serviceId = req.params.id;
    const service = req.body;
    if(!serviceId || !service){
        return next(new ApiError(httpStatus.badRequest, "Id not found or Input not found"))
    }
    const updatedService = await mentorServicesService.updateService(serviceId, service)
    res.status(httpStatus.ok).json({message : "Service updated successfully", updatedService})
}

const getAllServices = async (req, res) => {
    
}

const getServiceByMentor = async (req, res, next) => {
        const mentorId = req.params.id
        if(!mentorId){
            return next(new ApiError(httpStatus.badRequest, "Id not found"))
        }
        const services = await mentorServicesService.getServiceByMentor(mentorId);
        res.status(httpStatus.ok).json({message : "Mentor services fetched successfully", services})
}

const getServiceById = async (req, res) => {
    
}

module.exports = {addService, updateService, getAllServices, getServiceByMentor, getServiceById}