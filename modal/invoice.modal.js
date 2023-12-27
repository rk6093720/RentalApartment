const mongoose = require("mongoose");
const invoiceSchema = new mongoose.Schema({
   invoice:{type:String,required:true},
   date:{type:String,required:true,default:new Date()},
   roomType:{type:String,required:true},
   period:{type:String,required:true},
   totalAmount:{type:String,required:true},
   payment:{type:String,required:true},
   month:{type:String,required:true},
   year:{type:String,required:true},
   rent:{type:String,required:true},
})
const InvoiceModal = mongoose.model("invoice", invoiceSchema);
module.exports={
    InvoiceModal
}