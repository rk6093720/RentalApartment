const { UnitModal } = require("../modal/unit.modal");

const getUnit = async (req, res) => {
    try {
        const users = await UnitModal.find();
        res.status(200).send({ Unit: users, status: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
}
const postUnit = async (req, res) => {
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
        const newUnit = new UnitModal(newUser);
        await newUnit.save();
        res.status(201).json({ status: 'success', AddUnit: newUnit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}
const putUnit = async (req, res) => {
    const { id } = req.params;
    const { name,
        display,
        description, } = req.body;
    const newUnit = {
        name,
        display,
        description,
    }
    try {
        await UnitModal.findOneAndUpdate({ _id: id }, newUnit, { new: true });
        res.status(200).send({ status: "success", msg: "edit successfully", editUnit: newUnit });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "something went wrong", status: "error" })
    }
}
const deleteUnit = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteUnit = await UnitModal.findOneAndDelete({ _id: id })
        res.status(200).send({ status: "success", delete: deleteUnit })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }
}
module.exports = {
    getUnit,
    postUnit,
    putUnit,
    deleteUnit
}