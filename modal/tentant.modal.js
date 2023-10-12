const mongoose = require("mongoose");
const tentantSchema = new mongoose.Schema({
    business_name: { type: String },
    license_number: { type: String },
    tax_id: { type: String },
    business_address: { type: String },
    business_industry: { type: String },
    business_description: { type: String },
    employee_Status: { type: String },
    employee_position: { type: String },
    employee_phone: { type: String, maxlength: 10 },
    employee_email: { type: String },
    employee_postalAddress: { type: String },
    employee_physicalAddress: { type: String },
    tentant_Type: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    gender: { type: String },
    dob: { type: Date },
    passportNumber: { type: String },
    martialStatus: { type: String },
    phone: { type: String, maxlength: 10 },
    email: { type: String },
    country: { type: String },
    city: { type: String },
    postalCode: { type: String, maxlength: 6 },
    postalAddress: { type: String },
    physicalAddress: { type: String },
    password: { type: String },
    kinName: { type: String },
    kinPhone: { type: String, maxlength: 10 },
    kinRelation: { type: String },
    emergency_name: { type: String },
    emergency_phone: { type: String, maxlength: 10 },
    emergency_email: { type: String },
    emergency_relation: { type: String },
    emergency_postalAddress: { type: String },
    emergency_physicalAddress: { type: String }

})

const TentantModal = mongoose.model("Tentant",tentantSchema);
module.exports={
    TentantModal
}