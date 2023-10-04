const mongooose = require("mongoose");
const propertySchema = new mongooose.Schema({
    propertycode:{type:String},
    propertyname:{type:String},
    location:{type:String},
    propertyType:[{type:String}],
    address:{type:String},
    agentCommission:{type:Number},
    agentCommissionType:[{type:String}],
    agentPaymentType:[{type:String}],
    agentPaymentText:{type:String},
    extraFee:[{type:String}],
    extraCharge:{type:Number},
    typeOfCharge:[{type:String}],
    recurrence:[{type:String}],
    lateFine:[{type:String}],
    extraChargeLateFine:{type:Number},
    gracePeriod:{type:Number},
    frequency:[{type:String}],
    utlitityName:[{type:String}],
    cost:{type:Number},
    bill:{type:Number},
})
const PropertyModel = mongooose.model("property", propertySchema);
module.exports={
    PropertyModel
}