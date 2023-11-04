const { UserRoleModal } = require("../modal/user-Role.modal");

const getUserRole = async(req,res)=>{
    try {
        const users = await UserRoleModal.find();
        res.status(200).send({ UserRole: users, status: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
}
const postUserRole = async(req,res)=>{
    const {
        role,
        firstName,
        lastName,
        email,
        password
    } = req.body;
    try {
        const newUser = {
            role,
            firstName,
            lastName,
            email,
            password
        };
        const newUserRole = new UserRoleModal(newUser);
        await newUserRole.save();
        res.status(201).json({ status: 'success', AddUserRole: newUserRole });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}
const putUserRole = async(req,res)=>{
    const { id } = req.params;
    const { role,
        firstName,
        lastName,
        email,
        password } = req?.body;
    const newUserRole = {
        role,
        firstName,
        lastName,
        email,
        password
    }
    try {
        await UserRoleModal.findOneAndUpdate({ _id: id }, newUserRole, { new: true });
        res.status(200).send({ status: "success", msg: "edit successfully", editUserRole: newUserRole });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "something went wrong", status: "error" })
    }
}
const deleteUserRole = async(req,res)=>{
    const { id } = req.params;
    try {
        const deleteUserRole = await UserRoleModal.findOneAndDelete({ _id: id })
        res.status(200).send({ status: "success", delete: deleteUserRole })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }
}
module.exports={
    getUserRole,
    postUserRole,
    putUserRole,
    deleteUserRole
}