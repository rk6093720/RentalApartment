const {Router} = require("express");
const { userRegister } = require("../controller/user.routes");
const userRoute= Router();

userRoute.post("/signup",userRegister);

module.exports={
    userRoute
}