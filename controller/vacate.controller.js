const { VacateModal } = require("../modal/vacate.modal");

const getVacate = async(req,res)=>{
    try {
        const getVacate = await VacateModal.find()
        res.status(200).send({ vacate: getVacate, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" });
    }

}
const postVacate=async(req,res)=>{
    const { vacateDate,vacateTentant,vacateLease,vacatePropertya,vacateUnit,reason }= req.body;
    const newVacate ={
        vacateDate, vacateTentant, vacateLease, vacatePropertya, vacateUnit, reason 
    }
  try {
    const newVacateNotice =  await VacateModal(newVacate);
    await newVacateNotice.save();
      res.status(200).send({ AddVacate: newVacateNotice, status: "success" });
  } catch (error) {
    
  }
}

const putVacate = async (req, res) => {
    const { id } = req.params;
    const { vacateDate,vacateTentant,vacateLease,vacatePropertya,vacateUnit,reason } = req?.body;
    const newVacate = { vacateDate,vacateTentant,vacateLease,vacatePropertya,vacateUnit,reason }
    try {
        const newVacateLand = await VacateModal.findOneAndUpdate({ _id: id }, newVacate, { new: true })
        res.status(200).send({ status: "success", msg: "edit successfully", editVacate: newVacateLand });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "something went wrong", status: "error" })
    }

}
const deleteVacate = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteVacate = await VacateModal.findOneAndDelete({ _id: id })
        // console.log(deleteLease);
        res.status(200).send({ status: "success", delete: deleteVacate })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }
}
module.exports={
    getVacate,
    postVacate,
    putVacate,
    deleteVacate
}