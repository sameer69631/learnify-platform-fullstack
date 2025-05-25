const userModel = require('../models/user.model');

const getAllMentors = async () => {
    return await userModel.find({role : "mentor"})
};

const getMentorById = async (id) => {
    return await userModel.findOne({_id : id, role : "mentor"})
}

const getMentorByUserName = async (userName) => {
    const mentor = await userModel.find({userName, role:"mentor"});
    if(!mentor) return null;
    console.log("mentor found", mentor);
    return mentor;
}

module.exports = {getAllMentors, getMentorById, getMentorByUserName};