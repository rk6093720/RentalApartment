const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
    paymentTentant:{type:String},
    paymentLease: { type: String },
    amount: { type: Number },
    paymentMethod: { type: String },
    paymentDate: { type: String },
    paidBy: { type: String },
    referenceNumber: { type: String },
    beingPaymentFor: { type: String },
    extraNotes: { type: String }
})
const PaymentModal = mongoose.model("Payment", paymentSchema);
module.exports={
    PaymentModal
}