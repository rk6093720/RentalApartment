const mongoose = require("mongoose");
const utilities = new mongoose.Schema({
    name: { type: String },
    display: { type: String },
    description: { type: String },
})
const UtilitiesModal = mongoose.model("utilities", utilities);
module.exports = {
    UtilitiesModal
}