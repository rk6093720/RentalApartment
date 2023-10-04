
const {Router}= require("express");
const { getProperty, postProperty } = require("../controller/property.controller");
const propertyRouter = Router();

propertyRouter.get("/read",getProperty);

propertyRouter.post("/create",postProperty)
module.exports={
    propertyRouter
}