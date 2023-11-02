const { Router } = require("express");;
const { getUtilities, postUtilities, putUtilities, deleteUtilities } = require("../controller/utilities.controller");

const utilitiesRoute = Router();
utilitiesRoute.get("/read", getUtilities)

utilitiesRoute.post("/create", postUtilities);

utilitiesRoute.put("/update/:id", putUtilities);

utilitiesRoute.delete("/remove/:id", deleteUtilities)

module.exports = {
    utilitiesRoute
}