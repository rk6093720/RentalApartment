const {Router} = require("express");
const { getUserRole, postUserRole, putUserRole, deleteUserRole } = require("../controller/userRole.controller");
const userRouter = Router();
userRouter.get("/read",getUserRole);
userRouter.post("/create", postUserRole);
userRouter.put("/update/:id", putUserRole);
userRouter.delete("/remove/:id", deleteUserRole);

module.exports={
    userRouter
}