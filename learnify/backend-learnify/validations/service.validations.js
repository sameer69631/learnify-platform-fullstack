const Joi = require('joi')

const addServiceValidations = Joi.object({
    mentor : Joi.string().required(),
    serviceName : Joi.string().required().trim(),
    description : Joi.string().optional().trim(),
    duration : Joi.string().required().trim(),
    price : Joi.number().required(),
    active : Joi.boolean().required(),
    startDate : Joi.date().required(),
    endDate : Joi.date().optional(),
    startTime : Joi.date().required(),
    endTime : Joi.date().optional(),
})

const updateServiceValidations = Joi.object({
    mentor : Joi.string().required(),
    serviceName : Joi.string().required().trim(),
    description : Joi.string().optional().trim(),
    duration : Joi.number().required(),
    price : Joi.number().required(),
    active : Joi.boolean().required(),
    startDate : Joi.date().required(),
    endDate : Joi.optional(),
    startTime : Joi.date().required(),
    endTime : Joi.optional(),
})


module.exports = {addServiceValidations, updateServiceValidations}