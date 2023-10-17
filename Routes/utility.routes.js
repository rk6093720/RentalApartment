const {Router} = require("express");
const { getUtility, postUtility } = require("../controller/utility.controller");

const utilityRouter = Router();

utilityRouter.get("/read",getUtility);

utilityRouter.post("/create",postUtility);

module.exports={
    utilityRouter
}