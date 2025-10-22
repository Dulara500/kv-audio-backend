import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    email:{
        type : String,
        required : true,
        unique : true
    },

    name : {
        type : String,
        required : true,
    },

    rating : {
        type : Number,
        required : true
    },

    Comment : {
        type : String,
        required : true
    },

    date : {
        type : Date,
        required : true,
        default : Date.now()
    },
    
    profilePic:{
        type : String,
        required : true,
        default : "https://i.pinimg.com/originals/0f/69/1c/0f691cd77a8c6d90f07b35c10c95668f.jpg"
    },

    isApproved : {
        type : Boolean,
        required : true,
        default : false
    }

});

const Review = mongoose.model("Review",ReviewSchema);
export default Review;