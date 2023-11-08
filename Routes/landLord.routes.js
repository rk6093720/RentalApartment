const {Router} = require("express");
const { getLandLord, postLandLord, updateLandlord, deleteLandlord, filterLandlord,  upload } = require("../controller/landLord.controller");
const { authentication } = require("../middleware/authentication.middleware");
const landLordRouter = Router();
//get request for landLord;
landLordRouter.get("/read", authentication, getLandLord);
//post request for landLord;
landLordRouter.post("/create",authentication,upload,postLandLord)
//put and patch request for editing credentials for landlord;
landLordRouter.put("/update/:id",authentication,updateLandlord);
//delete request for landlord;
landLordRouter.delete("/remove/:id",authentication,deleteLandlord);
//filter by the get request 
landLordRouter.get("/land-filter",authentication,filterLandlord);
module.exports={
    landLordRouter
}