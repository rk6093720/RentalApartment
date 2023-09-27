const {Router} = require("express");
const { getLandLord, postLandLord, upload } = require("../controller/landLord.controller");
const landLordRouter = Router();
//get request for landLord;
landLordRouter.get("/read",getLandLord);
//post request for landLord;
landLordRouter.post("/create",upload,postLandLord)

module.exports={
    landLordRouter
}