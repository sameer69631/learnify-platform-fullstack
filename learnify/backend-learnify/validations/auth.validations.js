const Joi = require('joi');

const signUpValidations = Joi.object().keys({
    name:Joi.string().required().trim(),
    email:Joi.string().required().trim(),
    username:Joi.string().required().trim(),
    password:Joi.string().required().trim().min(8),
    role:Joi.string().valid("mentor","student").required()
})

const signInValidations = Joi.object().keys({
    email:Joi.string().required().trim(),
    password:Joi.string().required(),
})

module.exports = {signInValidations, signUpValidations}