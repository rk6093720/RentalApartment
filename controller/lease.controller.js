const { LeaseModal } = require("../modal/lease.modal");

const getLease=async(req,res)=>{
    try {
        const getNewLease = await LeaseModal.find()
        res.status(200).send({ Lease: getNewLease, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" });
    }
}
function generateRandomFourDigitCode() {
    const min = 1000; // Minimum four-digit number
    const max = 9999; // Maximum four-digit number
    const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomCode.toString(); // Convert it to a string
}
const postLease= async(req,res)=>{
    const { leaseNumber, lastBill,propertycode, property, unit, leaseType, amount, startDate, day, leaseAmount, deposit, tentants, extra, late, payment, utilities, dayType }= req.body;
    const randomCode = generateRandomFourDigitCode();
     const newLease ={
        leaseNumber:`LS${randomCode}`,
         property, unit, leaseType, amount, startDate, day, leaseAmount, deposit, tentants, lastBill, propertycode, extra, late, payment, utilities, dayType
     }  
    try {
        const newPostLease = await LeaseModal(newLease);
        await newPostLease.save();
        res.status(200).send({ AddLease: newPostLease, status: "success" });        
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" }) 
    }
}

const putLease = async(req,res)=>{
    const { id } = req.params;
    const { property, unit, leaseType, lastBill, propertycode, amount, startDate, day, leaseAmount, deposit, tentants, extra, late, payment, utilities, dayType  } = req?.body;
    const newLease = {
        property, unit, leaseType, lastBill, propertycode, amount, startDate, day, leaseAmount, deposit, tentants, extra, late, payment, utilities, dayType 
    }
    try {
        await LeaseModal.findOneAndUpdate({ _id: id }, newLease, { new: true })
        res.status(200).send({ status: "success", msg: "edit successfully", editLease: newLease });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "something went wrong", status: "error" })
    }

}
const deleteLease=async(req,res)=>{
    const { id } = req.params;
    try {
        const deleteLease = await LeaseModal.findOneAndDelete({ _id: id })
        // console.log(deleteLease);
        res.status(200).send({ status: "success", delete: deleteLease })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }
}
module.exports={
    getLease,
    postLease,
    putLease,
    deleteLease
}