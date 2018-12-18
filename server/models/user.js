const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
{
    username: { 
        type: String, 
        Required: true, 
        minlength: [3, "Username must be longer than 3 characters"],
        maxlength: [16, "Username cannot be more than 16 characters long"],
        
    }
})
var User = mongoose.model("User", UserSchema);


const ThreadSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
        minlength:[3,"Title must be longer than 3 characters "]
        },
    category: {
        type:String,
        required: true,
        },
    imageUrl: {type: String, required: false },
    users: [UserSchema],
    comments: [CommentSchema]
})
var Thread = mongoose.model("Thread", ThreadSchema);


const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        user: [UserSchema],
        minlength:[1,"Comments cannot be empty"]
    }
})
var Comment = mongoose.model("Comment", CommentSchema);

module.exports = User, Thread, Comment;

