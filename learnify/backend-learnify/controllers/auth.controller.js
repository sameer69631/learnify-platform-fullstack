const userService = require('../services/auth.service');
const httpStatus = require('../utils/httpStatus');
const tokenService = require('../services/token.service');

const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    const {name, email, username, password, role} = req.body;
    const user = await userService.createUser({name, email, username, password, role})
    user.password = undefined;
    return res.status(httpStatus.created).json({message : "sameer has saved a user",
        craterUser:user
    })
}

const signIn = async (req, res) => {
    const {email, password} = req.body;
    const user = await userService.loginUser(email, password);

    const token = tokenService.generateAuthToken(user)
    user.password = undefined;
    
    res.status(httpStatus.ok).json({message:"User SignedIn Successfully",token,user})
}

module.exports = {signIn, signUp}