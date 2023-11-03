const mongoose = require("mongoose");
const amount = new mongoose.Schema({
    payment:{type:String},
     name:{type:String},
    extraCharge:{type:String}, 
    fixedCharge:{type:String}, 
    description:{type:String}, 
})
const AmountModal = mongoose.model("amount",amount);
module.exports={
    AmountModal
}