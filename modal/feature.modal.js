const mongoose = require("mongoose");
const feature = new mongoose.Schema({
    name:{type:String},
    display:{type:String},
    description:{type:String},
})
const FeatureModal = mongoose.model("feature",feature);
module.exports={
    FeatureModal
}