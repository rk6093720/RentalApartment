const { UtilityModal } = require("../modal/utility.modal");

const getUtility= async(req,res)=>{
    try {
        const getNewUtility = await UtilityModal.find({})
        res.status(200).json({ Utility: getNewUtility, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error" });
    }
}
const postUtility=async(req,res)=>{
    const { propertyname, utilityname,manual }= req.body;
    const newUtility = { propertyname, utilityname, manual };
    try {
        const utilityLand= await UtilityModal(newUtility);
        await utilityLand.save();
        res.status(200).json({ AddUtility: utilityLand, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error" }) 
    }
}
const putUtility = async (req, res) => {
    const { id } = req.params;
    const { propertyname, utilityname, manual } = req?.body;
    const newUtility = { propertyname, utilityname, manual }
    try {
        const newUtilityLand= await UtilityModal.findOneAndUpdate({ _id: id }, newUtility, { new: true })
        res.status(200).json({ status: "success", msg: "edit successfully", editUtility: newUtilityLand });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "something went wrong", status: "error" })
    }

}
const deleteUtility = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteUtility = await UtilityModal.findOneAndDelete({ _id: id })
        // console.log(deleteLease);
        res.status(200).json({ status: "success", delete: deleteUtility })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error" })
    }
}
module.exports={
    getUtility,
    postUtility,
    putUtility,
    deleteUtility
}