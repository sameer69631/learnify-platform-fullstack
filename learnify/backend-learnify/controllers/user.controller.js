const cloudinary = require('cloudinary').v2;
const userService = require('../services/user.service');
const config = require('../config');
const ApiError = require('../helper/apiError');
const httpStatus = require('../utils/httpStatus');
const { message } = require('../validations/user.validations');
cloudinary.config(config.cloudinary);

const updateProfilePic = async (req, res) => {
    if(!req.file){
        return res.status(400).json({message : "No file uploaded"})
    }
    try{
        const result = await cloudinary.uploader.upload(req.file.path,{folder:"user_photos",use_filename:true,});
        const updateUser = await userService.updateProfilePic(req.user.id, result.secure_url)
        if(!updateUser){
            return res.status(404).json({message : "user not found"})
        }
        console.log("updated user : ",updateUser)
        res.status(200).json({message : "Photo uploaded", photoUrl : updateUser.photoUrl.replace(/^"|"$/g, '')})
    }
    catch(err){
        console.log(err)
    }
}

const getUser = (req, res) => {
    const userId = req.user._id;
    const user = userService.getUserById(userId)

    if(!user){
        return next(new ApiError(httpStatus.notFound, "User not found"))
    }

    res.status(httpStatus.ok).json({success:true, user})
}

const updateUserProfile = (req, res) => {
    const user = req.user;
    const profileData = req.body;

    const updatedProfileUser = userService.updateUserProfile(user._id, profileData);

    if(!updatedProfileUser){
        return next(new ApiError(httpStatus.notFound, "User not found"));
    }

    res.status(httpStatus.ok).json({success:true, message:"Profile updated successfully", user:updatedProfileUser})
}

module.exports = {updateProfilePic, getUser, updateUserProfile}