const mongoose = require("mongoose");
const amenities = new mongoose.Schema({
    name: { type: String },
    display: { type: String },
    description: { type: String },
})
const AmenitiesModal = mongoose.model("amenities", amenities);
module.exports = {
    AmenitiesModal
}