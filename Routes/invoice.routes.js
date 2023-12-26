 const {Router} = require("express");
const { getInvoice, postInvoice, putInvoice, deleteInvoice } = require("../controller/invoice.controller");
 const invoiceRouter = Router();

invoiceRouter.get("/read",getInvoice);
invoiceRouter.post("/create",postInvoice);
invoiceRouter.put("/update/:id",putInvoice);
invoiceRouter.delete("/remove/:id",deleteInvoice);

module.exports={
    invoiceRouter
}