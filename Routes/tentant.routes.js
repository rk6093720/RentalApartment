const {Router} = require("express");
const { getTentant, postTentant, editTentant, deleteTentant } = require("../controller/tentant.contoller");
const tentantRouter = Router();


tentantRouter.get("/read", getTentant);

tentantRouter.post("/create",postTentant);

tentantRouter.put("/update/:id",editTentant);

tentantRouter.delete("/remove/:id",deleteTentant)

module.exports={
    tentantRouter
}