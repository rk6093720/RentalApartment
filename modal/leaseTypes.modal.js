const mongoose = require("mongoose");
const leaseTypesSchema = new mongoose.Schema({
    name: { type: String },
    displayName: { type: String },
    description: { type: String }
})

const LeaseTypeModal = mongoose.model("LeaseTypes", leaseTypesSchema);
module.exports = {
    LeaseTypeModal
}