const express = require('express');
const mentorController = require('../../controllers/mentor.controller');
const assyncHandler = require('../../helper/asyncHandler');

const router = express.Router();

router.get("/", assyncHandler(mentorController.getAllMentors));
router.get("/:username", assyncHandler(mentorController.getMentorByUserName));
router.get("/get-mentor-by-id/:mentorId", assyncHandler(mentorController.getMentorById));

module.exports = router;