const { ProfileModal } = require("../modal/profile.modal");

const postProfile = async (req, res) => {
    const {email,password, firstName, lastname, country, state, city } = req.body;
    const profileData = {
        email, password, firstName, lastname, country, state, city
    }
    try {
        const profile = await ProfileModal(profileData)
        await profile.save();
        res.status(200).send({ AddProfile: profile, status: "success" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
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