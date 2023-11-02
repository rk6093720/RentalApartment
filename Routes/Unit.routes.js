const { Router } = require("express");
const { getUnit, postUnit, putUnit, deleteUnit } = require("../controller/unit.controller");

const unitRoute = Router();
unitRoute.get("/read", getUnit)

unitRoute.post("/create", postUnit);

unitRoute.put("/update/:id", putUnit);

unitRoute.delete("/remove/:id", deleteUnit)

module.exports = {
    unitRoute
}