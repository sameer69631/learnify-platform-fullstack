const {Schema, model} = require('mongoose');

const paymentSchema = new Schema({
    mentorId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    studentId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    serviceName : {
        type : Schema.Types.String,
        required : true
    },
    studentName : {
        type : Schema.Types.String,
        required : true
    },
    dateAndTime : {
        type : Schema.Types.Date,
        required : true
    },
    price : {
        type : Schema.Types.Number,
        required : true
    }
})

const paymentModel = model("Payments", paymentSchema);
module.exports = paymentModel;