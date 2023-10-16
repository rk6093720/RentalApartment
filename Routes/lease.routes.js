const {Router} = require("express");
const { getLease, postLease } = require("../controller/lease.controller");
const leaseRouter = Router();

leaseRouter.get("/read",getLease);

leaseRouter.post("/create",postLease);

module.exports={
    leaseRouter
}