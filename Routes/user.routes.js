const {Router} = require("express");
const { userRegister,userLogin } = require("../controller/user.controller");
const userRoute= Router();

userRoute.get("/", (req,res)=>{
    res.send("welcome to User Home Page")
})
userRoute.post("/signup",userRegister);
userRoute.post("/login",userLogin);
module.exports={
    userRoute
}