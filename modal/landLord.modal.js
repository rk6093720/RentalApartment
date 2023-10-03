const mongoose = require("mongoose");
const landLord = new mongoose.Schema({
    firstName:{type:String,required:true},
    LastName:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true,maxLength:10},
    country:{type:String,required:true},
    state:{type:String,required:true},
    city:{type:String,required:true},
    postalCode:{type:String,required:true},
    address:{type:String,required:true},
    registerDate:{type:Date,required:true},
    propertyName:{type:String,required:true},
    countApartment:{type:Number,required:true},
    adharCard:{type:String,required:true},
    document:{type:String},
    propertyCode:{type:String,required:true},  
})
const LandlordModal = mongoose.model("LandLord",landLord);
module.exports={
    LandlordModal
}