const multer = require("multer");
const path = require("path");
const moment = require("moment");
const { SystemModel } = require("../modal/system.model");
// const filterLandlord = async (req, res) => {
//     try {
//         const { firstName, LastName, email, phone } = req?.query;
//         const search = {};
//         if (firstName) {
//             search.firstName = { $regex: firstName, $options: "i" };
//         }
//         if (LastName) {
//             search.LastName = { $regex: LastName, $options: "i" };
//         }
//         if (email) {
//             search.email = { $regex: email, $options: "i" };
//         }
//         if (phone) {
//             search.phone = { $regex: phone, $options: "i" };
//         }
//         const page = req.query.page || 1;
//         const limit = req.query.limit;

//         const searchLand = await LandlordModal.find(search)
//         console.log(searchLand);
//         res.status(200).send({ status: "success", land: searchLand })
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ status: "error" })
//     }
// }
const getSystem = async (req, res) => {
    try {
        const users = await SystemModel.find();
        res.status(200).send({ System: users, status: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
};

const postSystem = async (req, res) => {
    let logos = (req.file) ? req.file.path : null;
    const {
        companyName,
        email,
        phone,
        currency,
        color,
        language,
        address,
        _id,
        website,
        postalAddress,
        postalCode,
       separator,
      separatorDot,
      separatorDate, 

    } = req.body;
    try {
        const existingUser = _id
            ? await SystemModel.findById(_id)
            : await SystemModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'User already exists' });
        }

        const date = moment().format("YYYY-MM-DD HH:mm:ss");
        console.log(logos,"LOGO");
        const newUser = {
            companyName,
            email,
            phone,
            logo:logos,
            currency,
            color,
            language,
            address,
            website,
            postalAddress,
            postalCode,
            date,
            separator,
            separatorDot,
            separatorDate, 
        };
        const newSystem = new SystemModel(newUser);
        await newSystem.save();
        res.status(201).json({ status: 'success', System: newSystem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
const putSystem = async (req, res) => {
    const { id } = req.params;
    const { companyName,
        email,
        phone,
        currency,
        color,
        language,
        address,
        website,
        postalAddress,
        postalCode,
        separator,
        separatorDot,
        separatorDate, } = req.body;
    const newSystem = {
        companyName,
        email,
        phone,
        currency,
        color,
        language,
        address,
        website,
        postalAddress,
        postalCode,
        separator,
        separatorDot,
        separatorDate, 
    }
    try {
        await SystemModel.findOneAndUpdate({ _id: id }, newSystem, { new: true });
        res.status(200).send({ status: "success", msg: "edit successfully", editSystem: newSystem });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "something went wrong", status: "error" })
    }
}

const deleteSystem = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteSystem = await SystemModel.findOneAndDelete({ _id: id })
        console.log(deleteLandlord);
        res.status(200).send({ status: "success", delete: deleteSystem })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }
}
// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "logo");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = path.extname(file.originalname);
        cb(null, uniqueSuffix);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1 MB limit
    fileFilter: (req, file, cb) => {
        const fileTypes = ['.jpeg', '.jpg', '.png', '.gif'];
        const extname = path.extname(file.originalname).toLowerCase();
        if (fileTypes.includes(extname)) {
            return cb(null, true);
        }
        cb('Invalid file format. Only JPEG, JPG, PNG, and GIF files are allowed');
    }
}).single("logo");


module.exports={
    getSystem,
    postSystem,
    upload,
    putSystem,
    deleteSystem
}