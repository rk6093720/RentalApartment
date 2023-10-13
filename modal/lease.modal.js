const mongoose = require("mongoose");
const leaseSchema = new mongoose.Schema({
    property:{type:String}, 
    unit:{type:String}, 
    leaseType:{type:String}, 
    amount:{type:String}, 
    startDate:{type:Date},
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
    leaseSetting:[
        {
            dayType:Number,
        }
    ]
}) 
const LeaseModal = mongoose.model("Lease", leaseSchema);
module.exports={
    LeaseModal
}