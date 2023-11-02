const { Router } = require("express");
const { getProperties, postProperties, putProperties, deleteProperties } = require("../controller/feature.controller");

const featureRoute = Router();


featureRoute.get("/read", getProperties)

featureRoute.post("/create", postProperties);

featureRoute.put("/update/:id", putProperties);

featureRoute.delete("/remove/:id", deleteProperties)

module.exports = {
    featureRoute
}