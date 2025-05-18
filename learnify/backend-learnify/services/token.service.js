const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require("../config")

const generateToken = (userId, expires, secret) => {
    const payload = {
        _id: userId,
        iat: moment().unix(),
        exp: expires.unix(),
    };
    return jwt.sign(payload, secret)
};

const generateAuthToken = (user) => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, "minutes");
    const accessToken = generateToken(user._id, accessTokenExpires, config.jwt.accessSecret);
    return accessToken;
};

const generateVerificationToken = (userId) => {
    const verificationTokenExpires = moment().add(config.jwt.verificationTokenExpirationMinutes, "minutes");
    const verificationToken = generateToken(userId, verificationTokenExpires, config.jwt.verificationSecret);
    return verificationToken;
};

const verifyToken = (token, secret) => {
    if (secret === "accessToken") {
        return jwt.verify(token, config.jwt.accessSecret);
    }
    else if (secret === "verify") {
        return jwt.verify(token, config.jwt.verificationSecret)
    }
}


module.exports = { generateAuthToken, generateVerificationToken, verifyToken }


