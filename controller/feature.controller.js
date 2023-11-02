const { FeatureModal } = require("../modal/feature.modal");


const getProperties = async (req, res) => {
    try {
        const users = await FeatureModal.find();
        res.status(200).send({ Properties: users, status: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
};

const postProperties = async (req, res) => {
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
        const newProperties = new FeatureModal(newUser);
        await newProperties.save();
        res.status(201).json({ status: 'success', AddProperties: newProperties });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
const putProperties = async (req, res) => {
    const { id } = req.params;
    const { name,
        display,
        description, } = req?.body;
    const newProperties = {
        name,
        display,
        description,
    }
    try {
        await FeatureModal.findOneAndUpdate({ _id: id }, newProperties, { new: true });
        res.status(200).send({ status: "success", msg: "edit successfully", editProperties: newProperties });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "something went wrong", status: "error" })
    }
}

const deleteProperties = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProperties = await FeatureModal.findOneAndDelete({ _id: id })
        res.status(200).send({ status: "success", delete: deleteProperties })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }
}

module.exports = {
    getProperties,
    postProperties,
    putProperties,
    deleteProperties
}