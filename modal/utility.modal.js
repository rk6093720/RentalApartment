const mongoose = require("mongoose");
const utilitySchema = new mongoose.Schema({
    propertyname:{type:String},
    utilityname: { type: String },
    manual:[
        {
            unit:String,
            date:Date,
            reading:Number,
        }
    ]
})
const UtilityModal = mongoose.model("Utility",utilitySchema);
module.exports={
    UtilityModal
}