const { InvoiceModal } = require("../modal/invoice.modal");

const getInvoice = async(req,res)=>{
    try {
        const invoice = await InvoiceModal.find();
        return res.status(200).json({status:"success", msg:"Getting Data", data:{invoice}})
    } catch (error) {
        return res.status(500).json({status:"error", msg:"Not getting data"})
    }
}
const postInvoice = async(req,res)=>{
    const {invoice,date,roomType,period,totalAmount,payment,rent}=req.body;
    const {_id}= req.params;
    try {
        const invoiceId = await InvoiceModal.findById(_id);
        if(!invoiceId){
            return res.status(401).json({status:"error",msg:"Invoice is Already exist"})
        }
        // res.send(invoiceId);
        const  newInvoice ={invoice,date,roomType,period,totalAmount,payment,rent};
        const dataInvoice = new InvoiceModal(newInvoice);
        await dataInvoice.save();
        return res.status(200).json({status:"Success",msg:"Invoice is create Successfully", invoice:{dataInvoice}})
    } catch (error) {
       return  res.status(500).json({status:"Error",msg:"Invoice is not create Successfully"})
    }

}
const putInvoice = async(req,res)=>{
    const {id} = req.params;
    const {invoice,date,roomType,period,totalAmount,payment,rent}=req.body;
    const newInvoice ={
        invoice,date,roomType,period,totalAmount,payment,rent
    }
    try {
        const editInvoice = await InvoiceModal.findByIdAndUpdate({_id:id,newInvoice, new:true});
        return res.status(200).json({status:"Success", msg:"edited Successfully",editInvoice})
    } catch (error) {
    return res.status(500).json({status:"error",msg:"not edited"})
    }
}
const deleteInvoice= async(req,res)=>{
    const {id}= req.params;
    try {
        const invoice = await InvoiceModal.findByIdAndDelete({_id:id});
        return res.status(200).json({status:"success", msg:"deleted Successfully",invoice})
    } catch (error) {
        return res.status(500).json({status:"error",msg:"not deleted"})
    }
}
module.exports ={
    getInvoice,
    postInvoice,
    putInvoice,
    deleteInvoice
}