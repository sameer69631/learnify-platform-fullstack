const {Schema, model} = require('mongoose');
const { type } = require('../validations/user.validations');

const bookingsSchema = new Schema({
    mentorId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "Users"
    },
    serviceId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "Service"
    },
    studentId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    serviceName : {
        type : Schema.Types.String,
        required : true
    },
    date : {
        type : Schema.Types.Date,
        required : true
    },
    time : {
        type : Schema.Types.Date,
        required : true
    },
    status : {
        type : Schema.Types.Boolean,
        required : true,
        default : true
    },
    price : {
        type : Schema.Types.Number,
        required : true
    }
})

const bookingModel = model("Bookings",bookingsSchema);
module.exports = bookingModel;