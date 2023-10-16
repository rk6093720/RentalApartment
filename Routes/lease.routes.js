const {Router} = require("express");
const { getLease, postLease, putLease, deleteLease } = require("../controller/lease.controller");
const leaseRouter = Router();

leaseRouter.get("/read",getLease);

leaseRouter.post("/create",postLease);

leaseRouter.put("/update/:id",putLease);

leaseRouter.delete("/remove/:id",deleteLease)

module.exports={
    leaseRouter
}