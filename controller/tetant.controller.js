const { TentantsModal } = require("../modal/tetant.modal");


const getTentant = async (req, res) => {
    try {
        const getNewTentant = await TentantsModal.find()
        res.status(200).send({ Tentants: getNewTentant, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" });
    }
}
const postTentant = async (req, res) => {
    const { name,
        displayName,
        description } = req.body;
    const newTentant = {
        name,
        displayName,
        description
    }
    try {
        const post_request = await TentantsModal(newTentant);
        await post_request.save();
        res.status(200).send({ AddTentants: post_request, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }

}
const editTentant = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        displayName,
        description
    } = req.body;
    const newTentant = {
        name,
        displayName,
        description
    }
    try {
        const newEditTentants = await TentantsModal.findOneAndUpdate({ _id: id }, newTentant, { new: true })
        res.status(200).send({ status: "success", msg: "edit successfully", editTentants: newEditTentants });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "something went wrong", status: "error" })
    }
}
const deleteTentant = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteTentants = await TentantsModal.findOneAndDelete({ _id: id })
        res.status(200).send({ status: "success", delete: deleteTentants })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }

}
module.exports = {
    getTentant,
    postTentant,
    editTentant,
    deleteTentant
}