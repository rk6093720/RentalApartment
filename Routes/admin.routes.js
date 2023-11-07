const { Router } = require("express");
const { Login, forgetPassword, Logout, resetPassword, postResetPassword, adminData, postProfile, getProfile } = require("../controller/admin.controller");
const adminRoute = Router();

adminRoute.get("/",(req,res)=>{
      res.send("welcome to home page")
    console.log("welcome to home page")
})
// adminRoute.post("/signup",Register)
adminRoute.post("/login",Login);
adminRoute.post("/forget-password",forgetPassword);
adminRoute.get("/reset-password/:id/:token",resetPassword);
adminRoute.post("/reset-password/:id/:token",postResetPassword);
adminRoute.post("/admin-data",adminData);
adminRoute.get("/logout",Logout);
adminRoute.put("/profile",postProfile);
adminRoute.get("/profile-data",getProfile)

module.exports={
    adminRoute
}