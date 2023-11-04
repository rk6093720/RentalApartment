const mongoose = require("mongoose");
const userRole = new mongoose.Schema({
  role:{type:String},
  firstName:{type:String},
  lastName:{type:String},
  email:{type:String},
  password:{type:String}  
})
const UserRoleModal = mongoose.model("userRole", userRole);
module.exports={
    UserRoleModal
}