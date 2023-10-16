const mongoose = require("mongoose");
const leaseSchema = new mongoose.Schema({
    leaseNumber:{type:String},
    property:{type:String}, 
    unit:{type:String}, 
    leaseType:{type:String}, 
    amount:{type:String}, 
    startDate:{type:Date},
    lastBill:{type:Date},
    propertycode:{type:String},
    day:{type:Number},
    leaseAmount:{type:String},
    deposit:[
        {
            utility:String,
            amount:Number
        }
    ],
    tentants:{type:String},
    extra: [
        {
            extraFee: String,
            valueCharge: Number,
            charge: String,
            recurrence: String,
        }
    ],
    late: [
        {
            lateFine: String,
            extraCharge: Number,
            typesCharge: String,
            gracePeriod: Number,
            frequency: String,
        }
    ],
    payment: [
        {
            paymentType: String,
            pDescription: String,
        }
    ],
    utilities: [
        {
            utilityName: String,
            cost: String,
            bill: String,
        }
    ],
    dayType:{type:String}
}) 
const LeaseModal = mongoose.model("Lease", leaseSchema);
module.exports={
    LeaseModal
}