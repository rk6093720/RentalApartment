
const {Router}= require("express");
const { getProperty } = require("../controller/property.controller");
const propertyRouter = Router();

propertyRouter.get("/read",getProperty);
module.exports={
    propertyRouter
}