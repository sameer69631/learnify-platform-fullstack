require("dotenv").config();

module.exports={
    PORT : process.env.PORT || 5000,
    DB_URL : process.env.DB_URL,
    PREFIX : process.env.PREFIX  || "/v1",
    jwt : {
        accessSecret : process.env.JWT_ACCESS_SECRET || "random-secret",
        accessExpirationMinutes : process.env.JWT_ACCESS_EXPIRATION_MINUTES || 30,
        verificationSecret : process.env.JWT_VERIFICATION_SECRET || "rendom-secret",
        verificationExpirationMinutes : process.env.JWT_VERIFICATION_EXPIRATION_MINUTES || 5,
    },
    cloudinary : {
        cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
        api_key : process.env.CLOUDINARY_API_KEY,
        api_secret : process.env.CLOUDINARY_API_SECRET,
    },
    razorpay : {
        key_id : process.env.RAZORPAY_KEY,
        key_secret : process.env.RAZORPAY_SECRET,
    },
}