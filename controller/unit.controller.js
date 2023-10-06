const { UnitModal } = require("../modal/property.modal");

const getUnit = async(req,res)=>{
   try {
    const unit = await UnitModal.find({})
    res.status(200).json({status:"success", getUnit:unit})
   } catch (error) {
       res.status(500).json({ status: "error", getUnit: unit })
   }
}
const postUnit = async(req,res)=>{
    const { unitName,floor,unitType,amount,bedRoom,bathRoom,totalRoom,squareFoot }=req.body;
    const newUnit = {
        unitName, floor, unitType, amount, bedRoom, bathRoom, totalRoom, squareFoot
    }
    try {
      const newUserUnit =  await UnitModal.create(newUnit);
      await newUserUnit.save();
      res.status(200).json({status:"success",units:newUserUnit})
    } catch (error) {
        console.log(error);
        res.status(200).json({ status: "error", units: newUserUnit })
    }
}

module.exports={
    getUnit,
    postUnit
}