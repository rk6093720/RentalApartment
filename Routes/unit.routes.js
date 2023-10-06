const {Router}= require("express");
const { getUnit, postUnit } = require("../controller/unit.controller");
const unitRouter = Router();

unitRouter.get("/read",getUnit);

unitRouter.post("/create",postUnit)


module.exports={
    unitRouter
}