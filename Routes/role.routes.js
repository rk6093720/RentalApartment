const { Router } = require("express");
const {  } = require("../controller/system.controller");
const { getRole, postRole, putRole, deleteRole } = require("../controller/role.conttroller");
const roleRouter = Router();


roleRouter.get("/read", getRole)

roleRouter.post("/create", postRole);

roleRouter.put("/update/:id", putRole);

roleRouter.delete("/remove/:id", deleteRole)

module.exports = {
    roleRouter
}