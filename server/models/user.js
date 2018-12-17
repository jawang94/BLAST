var mongoose = require("mongoose");


var UserSchema = new mongoose.schema(
{
    username: { 
        type: String, 
        Required: true, 
        minlength: [3, "Username needs to be longer than 3 characters"],
        maxlength: [16, "Username cannot be more than 16 characters long"]
    }
}
)


const ThreadSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
        minlength:[3,"Please enter a  name"]
        },
    Catergory: {
        type:String,
        required: true,
        minlength:[1, "URL PLZ!!!"]},
    users: [UserSchema]
})
