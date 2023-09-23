const mongoose= require("mongoose");
const adminSchema = new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    userType:{type:String},
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    verifyToken:{type:String}
})
const AdminModal = mongoose.model("admin",adminSchema);
module.exports={
    AdminModal
}