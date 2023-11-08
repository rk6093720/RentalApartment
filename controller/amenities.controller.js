const { AmenitiesModal } = require("../modal/amenities.modal");

const getAmenities= async(req,res)=>{
    try {
        const users = await AmenitiesModal.find();
        res.status(200).send({ Amenities: users, status: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
}
const postAmenities=async(req,res)=>{
    const {
        name,
        display,
        description,
    } = req.body;
    try {
        const newUser = {
            name,
            display,
            description,
        };
        const newProperties = new AmenitiesModal(newUser);
        await newProperties.save();
        res.status(201).json({ status: 'success', AddAmenities: newProperties });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}
const putAmenities=async(req,res)=>{
    const { id } = req.params;
    const { name,
        display,
        description, } = req.body;
    const newProperties = {
        name,
        display,
        description,
    }
    try {
        await AmenitiesModal.findOneAndUpdate({ _id: id }, newProperties, { new: true });
        res.status(200).send({ status: "success", msg: "edit successfully", editAmenities: newProperties });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "something went wrong", status: "error" })
    }
}
const deleteAmenities=async(req,res)=>{
    const { id } = req.params;
    try {
        const deleteProperties = await AmenitiesModal.findOneAndDelete({ _id: id })
        res.status(200).send({ status: "success", delete: deleteProperties })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }
}
module.exports={
    getAmenities,
    postAmenities,
    putAmenities,
    deleteAmenities
}