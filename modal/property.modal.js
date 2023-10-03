const mongooose = require("mongoose");
const propertySchema = new mongooose.Schema({
    propertycode:{type:String},
    propertyname:{type:String},
    location:{type:String},
    propertyType:[{type:String}],
    address:{type:String},
    
    

})
const PropertyModel = mongooose.model("property", propertySchema);
module.exports={
    PropertyModel
}