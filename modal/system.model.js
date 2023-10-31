const mongoose = require("mongoose");
const systemSchema = new mongoose.Schema({
    companyName:{type:String},
    email:{type:String}, 
    phone:{type:String}, 
    logo:{type:String},
    currency:{type:String},
    color:{type:String}, 
    language:{type:String}, 
    address:{type:String}, 
    website:{type:String}, 
    postalAddress:{type:String}, 
    postalCode:{type:String}, 
    date:{type:Date, default:Date.now()},
    separator:{type:String}, 
    separatorDot:{type:String}, 
    separatorDate:{type:String}, 

})
const SystemModel = mongoose.model("System", systemSchema);
module.exports={
    SystemModel
}