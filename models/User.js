import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required : true,
        unique : true
    },

    password:{
        type : String,
        required : true
    },
    role:{
        type : String,
        required : true,
        default : "customer"
    },
    firstName:{
        type : String,
        required : true
    },
    lastName:{
        type : String,
        required : true
    },
    address:{
        type : String,
        required : true
    },
    phone:{
        type : String,
        required : true
    },
    profilePic:{
        type : String,
        required : true,
        default : "https://i.pinimg.com/originals/0f/69/1c/0f691cd77a8c6d90f07b35c10c95668f.jpg"
    }
    
})
const User = mongoose.model("User",userSchema);
export default User;