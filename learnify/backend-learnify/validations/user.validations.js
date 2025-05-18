const Joi = require('joi')

const updateProfileValidation = Joi.object().keys({
    tags : Joi.array().items().optional(),
    title : Joi.string().optional(),
    bio : Joi.string().optional(),
    college : Joi.string().optional(),
    social : Joi.object({
        linkedin : Joi.string().optional(),
        github : Joi.string().optional(),
        twitter : Joi.string().optional(),
        facebook : Joi.string().optional(),
        instagram : Joi.string().optional(),
    }).optional(),
});

module.exports = updateProfileValidation