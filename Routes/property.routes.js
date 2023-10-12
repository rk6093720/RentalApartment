
const {Router}= require("express");
const { getProperty, postProperty, updateProperty, deleteProperty } = require("../controller/property.controller");
const propertyRouter = Router();

propertyRouter.get("/read",getProperty);

propertyRouter.post("/create",postProperty);

propertyRouter.put("/update/:id",updateProperty);

propertyRouter.delete("/remove/:id",deleteProperty)
module.exports={
    propertyRouter
}