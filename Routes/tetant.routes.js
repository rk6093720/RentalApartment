const { Router } = require("express");
const { getTentant, postTentant, editTentant, deleteTentant } = require("../controller/tetant.controller");
const tentantsRouter = Router();


tentantsRouter.get("/read", getTentant);

tentantsRouter.post("/create", postTentant);

tentantsRouter.put("/update/:id", editTentant);

tentantsRouter.delete("/remove/:id", deleteTentant)

module.exports = {
    tentantsRouter
}