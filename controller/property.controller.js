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
    const { propertycode, propertyname, location, unit, unitNumber, propertyType, address, agentCommission, agentCommissionType, agentPaymentType, agentPaymentText, extraFeeextraCharge, typeOfCharge, recurrence, lateFine, extraChargeLateFine, gracePeriod, frequency, utlitityName, cost, bill, _id }= req.body;
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
            propertycode: `PID${randomCode}`, propertyname, location, unit, unitNumber, propertyType, address, agentCommission, agentCommissionType, agentPaymentType, agentPaymentText, extraFeeextraCharge, typeOfCharge, recurrence, lateFine, extraChargeLateFine, gracePeriod, frequency, utlitityName, cost, bill
        }
      const newPropertyLand= await PropertyModel(newProperty);
      await newPropertyLand.save();
     res.status(200).json({AddProperty:newPropertyLand,status:"success"});
    } catch (error) {
        console.log(error);
        res.status(500).json({status:"error"})   
    }
}
module.exports={
    getProperty,
    postProperty
}