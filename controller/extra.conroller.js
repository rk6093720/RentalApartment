const { ExtraModal } = require("../modal/extra.modal");
const getExtra = async (req, res) => {
    try {
        const getNewExtra = await ExtraModal.find()
        res.status(200).send({ ExtraCharge: getNewExtra, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" });
    }
}
const postExtra = async (req, res) => {
    const { name,
        displayName,
        description } = req.body;
    const newExtra = {
        name,
        displayName,
        description
    }
    try {
        const post_request = await ExtraModal(newExtra);
        await post_request.save();
        res.status(200).send({ AddExtraCharge: post_request, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }

}
const editExtra = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        displayName,
        description
    } = req.body;
    const newExtra = {
        name,
        displayName,
        description
    }
    try {
        const newEditExtras = await ExtraModal.findOneAndUpdate({ _id: id }, newExtra, { new: true })
        res.status(200).send({ status: "success", msg: "edit successfully", editExtraCharge: newEditExtras });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "something went wrong", status: "error" })
    }
}
const deleteExtra = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteExtras = await ExtraModal.findOneAndDelete({ _id: id })
        res.status(200).send({ status: "success", delete: deleteExtras })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }

}
module.exports = {
    getExtra,
    postExtra,
    editExtra,
    deleteExtra
}