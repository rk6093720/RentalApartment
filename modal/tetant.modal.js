const mongoose = require("mongoose");
const tentantsSchema = new mongoose.Schema({
    name: { type: String },
    displayName: { type: String },
    description: { type: String }
})

const TentantsModal = mongoose.model("TentantLand", tentantsSchema);
module.exports = {
    TentantsModal
}