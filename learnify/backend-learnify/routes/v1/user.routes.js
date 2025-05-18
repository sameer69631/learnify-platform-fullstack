const express = require('express');
const userController = require('../../controllers/user.controller');
const { protect } = require('../../middleware/auth');
const asyncHandler = require('../../helper/asyncHandler');
const validate = require('../../middleware/validate')
const updateProfileValidation = require('../../validations/user.validations')
const upload = require('../../utils/multer')


const router = express.Router()

router.post("/upload-photo", protect, upload.single("photo"), asyncHandler(userController.updateProfilePic))

router.get("/",protect, asyncHandler(userController.getUser))

router.put("/update-profile", protect, validate(updateProfileValidation), asyncHandler(userController.updateUserProfile))


module.exports = router;