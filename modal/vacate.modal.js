const mongoose = require("mongoose");
const vacateSchema = new mongoose.Schema({
    vacateDate:{type:Date}, 
    vacateTentant:{type:String},
    vacateLease:{type:String}, 
    vacateProperty:{type:String},
    vacateUnit:{type:String}, 
    reason:{type:String},
})
const VacateModal = mongoose.model("Vacate",vacateSchema);
module.exports={
    VacateModal
}