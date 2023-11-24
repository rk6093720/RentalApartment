const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
        email:{type:String,required:true},
        password:{type:String,required:true},
        firstName:{type:String,required:true},
        lastName:{type:String,required:true},
        adharCard:{type:String,required:true},
        address:{type:String,required:true},
        country: { type: String, required: true },
        state: { type: String, required: true },
       city: { type: String, required: true },
       postalCode: { type: String, required: true }

}) 

const UserModal = mongoose.model("user",userSchema);
module.exports={
    UserModal
}