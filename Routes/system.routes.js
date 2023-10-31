const {Router} = require("express");
const systemRouter = Router();


systemRouter.get("/read",getSystem)



module.exports={
    systemRouter
}