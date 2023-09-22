const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
        email:{type:String,required:true},
        password:{type:String,required:true},
        firstName:{type:String,required:true},
        lastName:{type:String,required:true},
         adharCard:{type:String,required:true},
      country: { type:String },
      state: { type:String},
     city: { type:String},
     postalCode: { type:String }

}) 

const UserModal = mongoose.model("user",userSchema);
module.exports={
    UserModal
}