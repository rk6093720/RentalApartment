const mongoose= require("mongoose");
const adminSchema = new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    firstName:{type:String},
    userType:{type:String},
    lastName:{type:String},
    gstNumber:{type:String,required:true}

})
const AdminModal = mongoose.model("admin",adminSchema);
module.exports={
    AdminModal
}