const { Router } = require("express");
const { getAmenities, postAmenities, putAmenities, deleteAmenities } = require("../controller/amenities.controller");

const amenitiesRoute = Router();
amenitiesRoute.get("/read", getAmenities)

amenitiesRoute.post("/create", postAmenities);

amenitiesRoute.put("/update/:id", putAmenities);

amenitiesRoute.delete("/remove/:id", deleteAmenities)

module.exports = {
    amenitiesRoute
}