const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
        email:{type:String,required:true},
        password:{type:String,required:true},
        firstName:{type:String,required:true},
        lastName:{type:String,required:true},
         adharCard:{type:String,required:true},
      country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
      state: { type: mongoose.Schema.Types.ObjectId, ref: 'State' },
     city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
     postalCode: { type: mongoose.Schema.Types.ObjectId, ref: 'PostalCode' }

}) 

const UserModal = mongoose.model("user",userSchema);
module.exports={
    UserModal
}