const { Router } = require("express");
const { getExtra, postExtra, editExtra, deleteExtra } = require("../controller/extra.conroller");
const extraRouter = Router();
extraRouter.get("/read", getExtra);
extraRouter.post("/create", postExtra);
extraRouter.put("/update/:id", editExtra);
extraRouter.delete("/remove/:id", deleteExtra)
module.exports = {
    extraRouter
}