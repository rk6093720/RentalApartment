const {Router} = require("express");
const { getPayment, postPayment, putPayment, deletePayment } = require("../controller/payment.controller");
const paymentRouter = Router();
paymentRouter.get("/read",getPayment);
paymentRouter.post("/create",postPayment);
paymentRouter.put("/update/:id",putPayment);
paymentRouter.delete("/remove/:id",deletePayment);
module.exports={
    paymentRouter
}