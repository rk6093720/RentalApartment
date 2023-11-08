const { AmountModal } = require("../modal/amount.modal");

const getAmount=async(req,res)=>{
    try {
        const users = await AmountModal.find();
        res.status(200).send({ Amount: users, status: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
}
const postAmount= async(req,res)=>{
    const {
        payment, 
        name, 
        extraCharge, 
        fixedCharge, 
        description
    } = req.body;
    try {
        const newUser = {
            payment,
            name,
            extraCharge,
            fixedCharge,
            description
        };
        const newProperties = new AmountModal(newUser);
        await newProperties.save();
        res.status(201).json({ status: 'success', AddAmount: newProperties });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}
const putAmount = async(req,res)=>{
    const { id } = req.params;
    const { payment,
        name,
        extraCharge,
        fixedCharge,
        description } = req.body;
    const newAmount = {
        payment,
        name,
        extraCharge,
        fixedCharge,
        description
    }
    try {
        await AmountModal.findOneAndUpdate({ _id: id }, newAmount, { new: true });
        res.status(200).send({ status: "success", msg: "edit successfully", editAmount: newAmount });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "something went wrong", status: "error" })
    }
}
const deleteAmount = async(req,res)=>{
    const { id } = req.params;
    try {
        const deleteAmount = await AmountModal.findOneAndDelete({ _id: id })
        res.status(200).send({ status: "success", delete: deleteAmount })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }
}

module.exports={
    getAmount,
    postAmount,
    putAmount,
    deleteAmount
}