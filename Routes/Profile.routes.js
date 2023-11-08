
const { Router } = require("express");
const { getProfile, postProfile } = require("../controller/profile.controller");
const profileRouter = Router();

profileRouter.get("/read", getProfile);

profileRouter.post("/create", postProfile);

// profileRouter.put("/update/:id", updateProperty);

// profileRouter.delete("/remove/:id", deleteProperty)
module.exports = {
    profileRouter
}