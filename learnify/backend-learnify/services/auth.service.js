const UserModel = require('../models/user.model');
const ApiError = require('../helper/apiError');
const httpStatus = require('../utils/httpStatus');

const createUser = async(data)=>{
    return await UserModel.create(data);
}

const loginUser = async(email, password)=>{
    const user = await UserModel.findOne({email}).select("+password");
    if(!user || !(await user.isPasswordMatch(password))){
        throw new ApiError(httpStatus.unauthorized, "Incorrect Email or password")
    }
    return user
}

module.exports = {createUser, loginUser}