const { LeaseTypeModal } = require("../modal/leaseTypes.modal");


const getLeaseTypes = async (req, res) => {
    try {
        const getNewLeaseTypes = await LeaseTypeModal.find()
        res.status(200).send({ Lease: getNewLeaseTypes, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" });
    }
}
const postLeaseTypes = async (req, res) => {
    const { name,
        displayName,
        description } = req.body;
    const newLeaseTypes = {
        name,
        displayName,
        description
    }
    try {
        const post_request = await LeaseTypeModal(newLeaseTypes);
        await post_request.save();
        res.status(200).send({ AddLease: post_request, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }

}
const editLeaseTypes = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        displayName,
        description
    } = req.body;
    const newLeaseTypes = {
        name,
        displayName,
        description
    }
    try {
        const newEditLeaseTypess = await LeaseTypeModal.findOneAndUpdate({ _id: id }, newLeaseTypes, { new: true })
        res.status(200).send({ status: "success", msg: "edit successfully", editLease: newEditLeaseTypess });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "something went wrong", status: "error" })
    }
}
const deleteLeaseTypes = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteLeaseTypess = await LeaseTypeModal.findOneAndDelete({ _id: id })
        res.status(200).send({ status: "success", delete: deleteLeaseTypess })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }

}
module.exports = {
    getLeaseTypes,
    postLeaseTypes,
    editLeaseTypes,
    deleteLeaseTypes
}