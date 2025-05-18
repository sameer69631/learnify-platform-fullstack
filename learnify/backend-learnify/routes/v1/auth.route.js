const express = require('express')
const authController = require('../../controllers/auth.controller')
const validate = require('../../middleware/validate')
const assyncHandler = require('../../helper/asyncHandler')
const {signInValidations, signUpValidations} = require('../../validations/auth.validations')

const router = express.Router()

router.post("/signup",validate(signUpValidations),assyncHandler(authController.signUp))

router.post("/signin",validate(signInValidations),assyncHandler(authController.signIn))

module.exports = router;