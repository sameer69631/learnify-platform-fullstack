const userModel = require('../models/user.model')

const getUserById = async (id) => {
    return await userModel.findById(id).select("-password")
}

const updateProfilePic = async (id, photoUrl) => {
    return await userModel.findByIdAndUpdate(id, {photoUrl},{new:true})
}

const updateUser = async (id, data) => {
    return await userModel.findByIdAndUpdate(id, data,{new:true})
}

const updateUserProfile = async (id, profileData) => {
    return await userModel.findByIdAndUpdate(id, {profile : profileData}, {new:true})
}

module.exports = {getUserById, updateProfilePic, updateUser, updateUserProfile}