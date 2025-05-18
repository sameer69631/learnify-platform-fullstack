const express = require('express')
const mentorServiceController = require('../../controllers/mentorService.controller')
const {protect, restrictTo} = require('../../middleware/auth')
const validate = require('../../middleware/validate')
const {addServiceValidations, updateServiceValidations} = require('../../validations/service.validations')
const assyncHandler = require('../../helper/asyncHandler')

const router = express.Router()

router.post("/add-service", protect, restrictTo("mentor"), validate(addServiceValidations), assyncHandler(mentorServiceController.addService))
router.get("/get-service-by-mentor/:id", protect, assyncHandler(mentorServiceController.getServiceByMentor))
router.put("/update-service/:id", protect, restrictTo("mentor"), validate(updateServiceValidations), assyncHandler(mentorServiceController.updateService))

module.exports = router