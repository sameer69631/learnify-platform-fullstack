const {Schema, model} = require('mongoose');
const { type } = require('../validations/user.validations');

const serviceSchema = new Schema({
    mentor : {
        type : Schema.Types.ObjectId,
        ref : 'Users',
        required : true,
    },
    serviceName : {
        type : Schema.Types.String,
        required : true,
        trim : true,
    },
    description : {
        type : Schema.Types.String,
        required : true,
        trim : true,
    },
    duration : {
        type : Schema.Types.Number,
        required : true,
        trim : true,
    },
    price :  {
        type : Schema.Types.Number,
        required : true,
        trim : true,
    },
    active : {
        type : Schema.Types.Boolean,
        require : true,
        default : false,
    },
    startDate : {
        type : Schema.Types.Date,
        required : true,
    },
    endDate : {
        type : Schema.Types.Date,
        required : false,
    },
    startTime : {
        type : Schema.Types.Date,
        required : true
    },
    endTime : {
        type : Schema.Types.Date,
        required : false
    }
},{timestamps : true});

const serviceModel = model("Service", serviceSchema);
module.exports = serviceModel;