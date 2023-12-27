const { TentantModal } = require("../modal/tentant.modal");

const getTentant = async(req,res)=>{
    try {
        const getNewTentant = await TentantModal.find()
        res.status(200).send({ Tentant: getNewTentant, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" });
    }
}
const postTentant= async(req,res)=>{
    const { firstName,lastName,email,phone,dateOfBirth,address,employment,rentalHistory,references, creditScore,identification  }= req.body;
    const newTentant={
        firstName, lastName, email, phone, dateOfBirth, address, employment, rentalHistory, references, creditScore, identification 
    }
    const {_id}= req.params;
    try {
        const existingTentant = _id
            ? await TentantModal.findById(_id)
            : await TentantModal.findOne({ email });
        if (existingTentant) {
            return res.status(400).json({ status: 'error', message: 'User already exists' });
        }
        const post_request = await TentantModal(newTentant);
        await post_request.save();
        res.status(200).send({ AddTentant: post_request, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" }) 
    }

}
const editTentant = async(req,res)=>{
    const {id} = req.params;
    const {
        firstName, lastName, email, phone, dateOfBirth, address, employment, rentalHistory, references, creditScore, identification 
    } = req.body;
    const newTentant={
        firstName, lastName, email, phone, dateOfBirth, address, employment, rentalHistory, references, creditScore, identification 
    }
    try {
        const newEditTentants= await TentantModal.findOneAndUpdate({_id:id},newTentant,{new:true})
        res.status(200).send({ status: "success", msg: "edit successfully", editTentant: newEditTentants });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "something went wrong", status: "error" })
    }
}
const deleteTentant = async(req,res)=>{
    const { id } = req.params;
    try {
        const deleteTentant = await TentantModal.findOneAndDelete({ _id: id })
        res.status(200).send({ status: "success", delete: deleteTentant })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }

}
module.exports={
    getTentant,
    postTentant,
    editTentant,
    deleteTentant
}