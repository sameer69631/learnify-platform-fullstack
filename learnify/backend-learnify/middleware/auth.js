const {getUserById} = require('../services/user.service')
const tokenService = require('../services/token.service')
const ApiError = require('../helper/apiError')
const httpStatus = require('../utils/httpStatus')
const jwt = require('jsonwebtoken')

const protect = (async (req,res,next) => {
    let token;
    const authHeader = req.headers.authorization;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        authorizationData = authHeader.split(" ");
        token = authorizationData[1]
        token = token.replace(/^"|"$/g, '').replace(/\\"/g, '');
        if(!token){
            return next(new ApiError(httpStatus.unauthorized, "Please login to access"))
        }
    }
    try{
        const decoded = tokenService.verifyToken(token, "accessToken")
        const currentUser = await getUserById(decoded._id)
        if(!currentUser){
            return (new ApiError(httpStatus.unauthorized, "Token is not valid please login again"))
        }
        req.user = currentUser;
        next();
    }
    catch(err){
        return next(new ApiError(httpStatus.unauthorized, `You are not allowed ${err}`))
    }
})

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ApiError(httpStatus.unauthorized, "You are not allowed"))
        }
        next();
    }
}

module.exports = {protect, restrictTo}