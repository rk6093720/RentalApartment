const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String },
    firstName: { type: String },
    lastname: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
})
const ProfileModal = mongoose.model("Profile", profileSchema);
module.exports = {
    ProfileModal
}