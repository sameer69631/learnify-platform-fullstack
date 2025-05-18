const bcrypt = require('bcrypt')
const {Schema, model} = require('mongoose')

const userSchema = new Schema(
    {
        photoUrl:{
            type : Schema.Types.String,
            default : "",
        },
        name:{
            type:Schema.Types.String,
            required:true,
            trim:true
        },
        email:{
            type:Schema.Types.String,
            required:true,
            trim:true,
        },
        username:{
            type:Schema.Types.String,
            required:true,
            trim:true,
            unique:true,
        },
        password:{
            type:Schema.Types.String,
            trim:true,
            required:true,
        },
        role:{
            type:Schema.Types.String,
            enum:["mentor","student"],
            default:null
        },
        verified:{
            type:Schema.Types.Boolean,
            default:false,
        },
        profile:{
            tags : {
                type : [Schema.Types.String],
                default:[],
            },
            title : {
                type : Schema.Types.String,
                default : "",
            },
            bio : {
                type : Schema.Types.String,
                default : "",
            },
            college : {
                type : Schema.Types.String,
                default : "",
            },
            social : {
                linkedin : {
                    type : Schema.Types.String,
                    default : ""
                },
                github : {
                    type : Schema.Types.String,
                    default : ""
                },
                twitter : {
                    type : Schema.Types.String,
                    default : ""
                },
                facebook : {
                    type : Schema.Types.String,
                    default : "",
                },
                instagram : {
                    type : Schema.Types.String,
                    default : "",
                }
            }
        }
    },
    {timestamps : true}
)

userSchema.methods.isPasswordMatch = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.pre("save",async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
})

userSchema.index({email:1})

const userModel = model("Users", userSchema)
module.exports = userModel;