const {Router} = require("express");
const { getTentant, postTentant } = require("../controller/tentant.contoller");
const tentantRouter = Router();


tentantRouter.get("/read", getTentant);

tentantRouter.post("/create",postTentant)

module.exports={
    tentantRouter
}