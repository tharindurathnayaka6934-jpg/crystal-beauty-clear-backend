import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email :{
        type : String,
        required : true,
        unique : true,
    },
    firstname :{
        type : String,
        required : true,
    },
    lastname :{
        type : String,
        required : true,
    },
    role :{
        type : String,
        required : true,
        default : "user"
        //user means customer
    },
    password :{
        type : String,
        required : true,
    },
    phone :{
        type : String,
        required : true,
        default : "Not given"
    },
    isDisable :{
        type : Boolean,
        required : true,
        default : false
    },
    isEmailVerified :{
        type : Boolean,
        required : true,
        default :false
    }
})

const User = mongoose.model("users",userSchema)

export default User;