const mongooose = require("mongoose");
const propertySchema = new mongooose.Schema({
    address: { type: String },
    agentCommission: { type: Number },
    agentCommissionType: { type: String },
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
    location: { type: String },
    modals: [
        {
            unit: String,
            unitName: String,
            floor: Number,
            amount: Number,
            unitType: String,
            bedRoom: Number,
            bathRoom: Number,
            totalRoom: Number,
            squareFoot: Number,
        }
    ],
    propertycode:{type:String},
    propertyname:{type:String},
    propertyType:{type:String},
    payment:[
       {
            paymentType: String,
            pDescription: String,
       }
    ],
   
    utilities:[
        {
            utilityName:String,
            cost:String,
            bill:String,
        }
    ],
})
const PropertyModel = mongooose.model("property", propertySchema);
module.exports={
    PropertyModel,
}