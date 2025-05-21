const ApiError = require('../helper/apiError');
const mentorService = require('../services/mentor.servive');
const httpStatus = require('../utils/httpStatus');

const getAllMentors = async (req, res, next) => {
    const mentors = await mentorService.getAllMentors();
    res.status(httpStatus.ok).json({ success: true, mentors })
}

const getMentorByUserName = async (req, res, next) => {
    const { userName } = req.params;
    const mentor = await mentorService.getMentorByUserName(userName)
    if (!mentor) {
        return next(new ApiError(httpStatus.notFound, "mentor not found"))
    }
    res.status(httpStatus.ok).json({ success: true, mentor })
}

const getMentorById = async (req, res, next) => {
    const mentorId = req.params.mentorId;
    try {
        const mentor = await mentorService.getMentorById(mentorId);
        if (!mentor) {
            return next(new ApiError(httpStatus.badRequest, "Unable to get mentor"))
        }
        res.status(httpStatus.ok).json({message : "Mentor fetched successfully", mentor})
    }
    catch (err) {
        console.log("Unable to get mentor : ", err.message)
    }
}

module.exports = { getAllMentors, getMentorByUserName, getMentorById}