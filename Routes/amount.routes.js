const {Router} = require("express");
const { getAmount, postAmount, putAmount, deleteAmount } = require("../controller/amount.controller");
const amountRouter = Router();

amountRouter.get("/read", getAmount);
amountRouter.post("/create",postAmount);
amountRouter.put("/update/:id",putAmount);
amountRouter.delete("/remove/:id",deleteAmount)

module.exports={
    amountRouter
}