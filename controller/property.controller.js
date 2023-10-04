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

const postProperty= async(req,res)=>{
    const { propertycode,propertyname,location,propertyType,address,agentCommission,agentCommissionType,agentPaymentType,agentPaymentText,extraFeeextraCharge,typeOfCharge,recurrence,lateFine,extraChargeLateFine,gracePeriod,frequency,utlitityName,cost,bill,_id }= req.body;
    try {
        const exist=_id
          ? await PropertyModel.findById(_id) 
          : await PropertyModel.findOne({ propertycode })
        if(exist){
            console.log(exist);
            return res.status(400).json({status:"error",msg:"someone property already mention"})
        }
        const newProperty = {
            propertycode, propertyname, location, propertyType, address, agentCommission, agentCommissionType, agentPaymentType, agentPaymentText, extraFeeextraCharge, typeOfCharge, recurrence, lateFine, extraChargeLateFine, gracePeriod, frequency, utlitityName, cost, bill
        }
      const newPropertyLand= await PropertyModel(newProperty);
      await newPropertyLand.save();
     res.status(200).json({property:newPropertyLand,status:"success"});
    } catch (error) {
        console.log(error);
        res.status(500).json({status:"error"})   
    }
}
module.exports={
    getProperty,
    postProperty
}