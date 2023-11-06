const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
    name:{type:String},
    displayName:{type:String},
    checkbox:{type:String}
})
const RoleModel = mongoose.model("Role", roleSchema);
module.exports = {
    RoleModel
}