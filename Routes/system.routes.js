const {Router} = require("express");
const { getSystem, postSystem, putSystem, deleteSystem, upload } = require("../controller/system.controller");
const systemRouter = Router();


systemRouter.get("/read",getSystem)

systemRouter.post("/create", upload,postSystem);

systemRouter.put("/update/:id",putSystem);

systemRouter.delete("/remove/:id",deleteSystem)

module.exports={
    systemRouter
}