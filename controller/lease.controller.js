const { LeaseModal } = require("../modal/lease.modal");

const getLease=async(req,res)=>{
    try {
        const getNewLease = await LeaseModal.find({})
        res.status(200).json({ Lease: getNewLease, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error" });
    }
}
function generateRandomFourDigitCode() {
    const min = 1000; // Minimum four-digit number
    const max = 9999; // Maximum four-digit number
    const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomCode.toString(); // Convert it to a string
}
const postLease= async(req,res)=>{
    const { leaseNumber, property, unit, leaseType, amount, startDate, day, leaseAmount, deposit, tentants, extra, late, payment, utilities, dayType }= req.body;
    const randomCode = generateRandomFourDigitCode();
     const newLease ={
        leaseNumber:`LS${randomCode}`,
         property, unit, leaseType, amount, startDate, day, leaseAmount, deposit, tentants, extra, late, payment, utilities, dayType
     }  
    try {
        const newPostLease = await LeaseModal(newLease);
        await newPostLease.save();
        res.status(200).json({ AddLease: newPostLease, status: "success" });        
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error" }) 
    }
}

module.exports={
    getLease,
    postLease
}