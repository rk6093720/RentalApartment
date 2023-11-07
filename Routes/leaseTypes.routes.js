const { Router } = require("express");
const { getLeaseTypes, postLeaseTypes, editLeaseTypes, deleteLeaseTypes } = require("../controller/leaseTypes.controller");
const leaseTypeRouter = Router();


leaseTypeRouter.get("/read", getLeaseTypes);

leaseTypeRouter.post("/create", postLeaseTypes);

leaseTypeRouter.put("/update/:id", editLeaseTypes);

leaseTypeRouter.delete("/remove/:id", deleteLeaseTypes)

module.exports = {
    leaseTypeRouter
}