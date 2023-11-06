const { Router } = require("express");
const { postTentant, getTentant, editTentant, deleteTentant } = require("../controller/tentants.controller");
const tentantsRouter = Router();


tentantsRouter.get("/read", getTentant);

tentantsRouter.post("/create", postTentant);

tentantsRouter.put("/update/:id", editTentant);

tentantsRouter.delete("/remove/:id", deleteTentant)

module.exports = {
    tentantsRouter
}