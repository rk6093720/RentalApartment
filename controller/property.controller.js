const { PropertyModel } = require("../modal/property.modal");
const getProperty= async(req,res)=>{
   try {
    const getNewProperty = await PropertyModel.find({})
    res.status(200).json({Property:getNewProperty, status:"success"});
   } catch (error) {
    console.log(error);
    res.status(500).json({  status: "error" });
   }
}
function generateRandomFourDigitCode() {
    const min = 1000; // Minimum four-digit number
    const max = 9999; // Maximum four-digit number
    const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomCode.toString(); // Convert it to a string
}

const postProperty= async(req,res)=>{
    const { address, agentCommission, agentCommissionType, extra, late, location, propertycode, propertyname,  propertyType, modals,  payment,  utilities , _id }= req.body;
    try {
        const exist=_id
          ? await PropertyModel.findById(_id) 
          : await PropertyModel.findOne({ propertycode })
        if(exist){
            console.log(exist);
            return res.status(400).json({status:"error",msg:"someone property already mention"})
        }
    // Generate a random four-digit code
        const randomCode = generateRandomFourDigitCode();
        const newProperty = {
            address, agentCommission, agentCommissionType, extra, late, location, modals,propertycode: `PID${randomCode}`, propertyname, propertyType, payment,utilities
        }
      const newPropertyLand= await PropertyModel(newProperty);
      await newPropertyLand.save();
     res.status(200).json({AddProperty:newPropertyLand,status:"success"});
    } catch (error) {
        console.log(error);
        res.status(500).json({status:"error"})   
    }
}
const updateProperty = async(req,res)=>{
         const {id} = req.params;
    const { address, agentCommission, agentCommissionType, extra, late, location, propertycode, propertyname, propertyType, modals, payment, utilities }= req?.body;
    const newProperty ={
        address, agentCommission, agentCommissionType, extra, late, location, propertycode, propertyname, propertyType, modals, payment, utilities
    }
    try {
        await PropertyModel.findOneAndUpdate({_id:id}, newProperty, {new:true})
        res.status(200).json({ status: "success", msg: "edit successfully", editProperty: newProperty });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "something went wrong", status: "error" })
    }
}

const deleteProperty = async(req,res)=>{
    const {id} = req.params;
    try {
      const deleteProperty = await PropertyModel.findOneAndDelete({_id:id})
        console.log(deleteProperty);
        res.status(200).json({ status: "success", delete: deleteProperty })  
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error" })
    }
}
module.exports={
    getProperty,
    postProperty,
    updateProperty,
    deleteProperty
}