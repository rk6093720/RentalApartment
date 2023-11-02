const { UtilitiesModal } = require("../modal/utilities.modal");

const getUtilities = async (req, res) => {
    try {
        const users = await UtilitiesModal.find();
        res.status(200).send({ Utilities: users, status: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
}
const postUtilities = async (req, res) => {
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
        const newUtilities = new UtilitiesModal(newUser);
        await newUtilities.save();
        res.status(201).json({ status: 'success', AddUtilities: newUtilities });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}
const putUtilities = async (req, res) => {
    const { id } = req.params;
    const { name,
        display,
        description, } = req?.body;
    const newUtilities = {
        name,
        display,
        description,
    }
    try {
        await UtilitiesModal.findOneAndUpdate({ _id: id }, newUtilities, { new: true });
        res.status(200).send({ status: "success", msg: "edit successfully", editUtilities: newUtilities });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "something went wrong", status: "error" })
    }
}
const deleteUtilities = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteUtilities = await UtilitiesModal.findOneAndDelete({ _id: id })
        res.status(200).send({ status: "success", delete: deleteUtilities })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }
}
module.exports = {
    getUtilities,
    postUtilities,
    putUtilities,
    deleteUtilities
}