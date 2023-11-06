const { RoleModel } = require("../modal/role.modal");

const getRole = async(req,res)=>{
    try {
        const users = await RoleModel.find();
        res.status(200).send({ Role: users, status: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
}
const postRole = async (req, res) => {
    const { name,
        displayName,
        checkbox  } = req.body;
    const newRole = {
        name,
        displayName,
        checkbox 
    }
    try {
        const post_request = await RoleModel(newRole);
        await post_request.save();
        res.status(200).send({ AddRole: post_request, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }

}
const putRole = async (req, res) => {
    const { id } = req.params;
    const { name,
        displayName,
        checkbox } = req?.body;
    const newRole = {
        name,
        displayName,
        checkbox
    }
    try {
        await RoleModel.findOneAndUpdate({ _id: id }, newRole, { new: true })
        res.status(200).send({ status: "success", msg: "edit successfully", editRole: newRole });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "something went wrong", status: "error" })
    }
}
const deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteRole = await RoleModel.findOneAndDelete({ _id: id })
        // console.log(deleteProperty);
        res.status(200).send({ status: "success", delete: deleteRole })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }
}
module.exports={
    getRole,
    postRole,
    putRole,
    deleteRole
}