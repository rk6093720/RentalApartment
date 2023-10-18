const { PaymentModal } = require("../modal/payment.modal");

const getPayment = async(req,res)=>{
    try {
        const getNewPayment = await PaymentModal.find()
        res.status(200).send({ Property: getNewPayment, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" });
    }
}
const postPayment = async(req,res)=>{
    const { paymentTentant,paymentLease,amount,paymentMethod,paymentDate, paidBy, referenceNumber,beingPaymentFor,extraNotes }=req.body;
    const newPayment ={
        paymentTentant, paymentLease, amount, paymentMethod, paymentDate, paidBy, referenceNumber, beingPaymentFor, extraNotes
    }
    try {
       const newPaymentLand =  await PaymentModal(newPayment);
       await newPaymentLand.save();
     res.status(200).send({ AddPaymentt: newPaymentLand, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" }) 
    }
}
const putPayment = async (req, res) => {
    const { id } = req.params;
    const { paymentTentant, paymentLease, amount, paymentMethod, paymentDate, paidBy, referenceNumber, beingPaymentFor, extraNotes } = req?.body;
    const newPayment = {
        paymentTentant, paymentLease, amount, paymentMethod, paymentDate, paidBy, referenceNumber, beingPaymentFor, extraNotes
    }
    try {
        await PaymentModal.findOneAndUpdate({ _id: id }, newPayment, { new: true })
        res.status(200).send({ status: "success", msg: "edit successfully", editPayment: newPayment });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "something went wrong", status: "error" })
    }

}
const deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletePayment = await PaymentModal.findOneAndDelete({ _id: id })
        // console.log(deleteLease);
        res.status(200).send({ status: "success", delete: deletePayment })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }
}
module.exports={
    getPayment,
    postPayment,
    putPayment,
    deletePayment
}