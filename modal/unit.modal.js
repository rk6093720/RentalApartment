const mongoose = require("mongoose");
const unit = new mongoose.Schema({
    name: { type: String },
    display: { type: String },
    description: { type: String },
})
const UnitModal = mongoose.model("unit", unit);
module.exports = {
    UnitModal
}