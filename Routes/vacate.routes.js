const {Router} = require("express");
const { getVacate, postVacate, putVacate, deleteVacate } = require("../controller/vacate.controller");
const vacateRouter = Router();

vacateRouter.get("/read",getVacate);

vacateRouter.post("/create",postVacate);

vacateRouter.put("/update/:id", putVacate);

vacateRouter.delete("/remove/:id", deleteVacate)


module.exports={
    vacateRouter
}