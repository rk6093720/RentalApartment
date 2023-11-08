const { ProfileModal } = require("../modal/profile.modal");

const postProfile = async (req, res) => {
    const {email,password, firstName, lastname, country, state, city } = req?.body;
    try {
        const admin = {
            email,password,firstName, lastname, country, state, city
        }
        const profile = await ProfileModal( admin)
        await profile.save();
        res.status(200).json({ AddProfile: profile, status: "success" })
    } catch (error) {
        res.status(500).json({ status: "error" })
    }
}

const getProfile = async (req, res) => {
    try {
        const profileData = await ProfileModal.find();
        res.status(200).send({ Profile: profileData, status: "success" })
    } catch (error) {
        res.status(500).send({ status: "error" })
    }
}

module.exports={
    getProfile,
    postProfile
}