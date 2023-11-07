const mongoose = require("mongoose");
const extraSchema = new mongoose.Schema({
    name: { type: String },
    displayName: { type: String },
    description: { type: String }
})

const ExtraModal = mongoose.model("ExtraSystem", extraSchema);
module.exports = {
    ExtraModal
}