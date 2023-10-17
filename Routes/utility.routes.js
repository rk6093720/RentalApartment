const {Router} = require("express");
const { getUtility, postUtility, putUtility, deleteUtility } = require("../controller/utility.controller");

const utilityRouter = Router();

utilityRouter.get("/read",getUtility);

utilityRouter.post("/create",postUtility);

utilityRouter.put("/update/:id",putUtility);

utilityRouter.delete("/remove/:id",deleteUtility)

module.exports={
    utilityRouter
}