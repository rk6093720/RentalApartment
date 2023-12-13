const { Router } = require("express");
const { Login, forgetPassword, Logout, resetPassword, postResetPassword, adminData } = require("../controller/admin.controller");
const { authenticationSuperAdmin } = require("../middleware/authentication.middleware");
const adminRoute = Router();

adminRoute.get("/",(req,res)=>{
      res.send("welcome to home page")
    console.log("welcome to home page")
})
// adminRoute.post("/signup",Register)
adminRoute.post("/login", Login);
adminRoute.post("/forget-password",forgetPassword);
adminRoute.get("/reset-password/:id/:token",resetPassword);
adminRoute.post("/reset-password/:id/:token",postResetPassword);
adminRoute.get("/superAdmin", authenticationSuperAdmin,adminData);
adminRoute.get("/logout",Logout);
module.exports={
    adminRoute
}