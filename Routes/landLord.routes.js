const {Router} = require("express");
const { getLandLord, postLandLord, upload, updateLandLord } = require("../controller/landLord.controller");
const landLordRouter = Router();
//get request for landLord;
landLordRouter.get("/read",getLandLord);
//post request for landLord;
landLordRouter.post("/create",upload,postLandLord)
//put and patch request for editing credentials for landlord;
landLordRouter.put("/update/:id",updateLandLord);
module.exports={
    landLordRouter
}