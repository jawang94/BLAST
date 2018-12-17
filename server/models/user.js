const mongoose = require("mongoose");


const UserSchema = new mongoose.schema(
{
    username: { 
        type: String, 
        Required: true, 
        minlength: [3, "Username must be longer than 3 characters"],
        maxlength: [16, "Username cannot be more than 16 characters long"],
        
    }
})


const ThreadSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
        minlength:[3,"Title must be longer than 3 characters "]
        },
    Catergory: {
        type:String,
        required: true,
        },
    users: [UserSchema],
    comments: [CommentSchema]
})


const CommentSchema = new mongoose.Schem({
    Content: {
        type: String,
        required: true,
        user: [UserSchema, maxlength:[1]],
        minlength:[1,"Comments cannot be empty"]
    }
})