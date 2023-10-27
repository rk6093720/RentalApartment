const { LandlordModal } = require("../modal/landLord.modal");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const filterLandlord= async(req,res)=>{
  try {
    const {firstName,LastName,email,phone}= req?.query;
    const search={};
    if(firstName){
        search.firstName={$regex:firstName,$options:"i"};
    }
    if(LastName){
        search.LastName = { $regex: LastName, $options: "i" };
    }
    if(email){
        search.email = { $regex: email, $options: "i" };
    }
    if(phone){
        search.phone = { $regex: phone, $options: "i" };
    }
    const page = req.query.page || 1;
    const limit = req.query.limit ;
    
    const searchLand = await LandlordModal.find(search)
     console.log(searchLand);
     res.status(200).send({status:"success",land:searchLand})
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error"  })
  }
}
const getLandLord = async (req, res) => {
    try {
        const users = await LandlordModal.find();
        res.status(200).send({ Landlords: users, status: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
};

const postLandLord = async (req, res) => {
    let images = (req.file) ? req.file.path :null;
    const {
        firstName,
        LastName,
        email,
        city,
        phone,
        country,
        _id,
        state,
        postalCode,
        address,
        propertyName,
        countApartment,
        adharCard,
        propertyCode
    } = req.body;
    try {
        const existingUser = _id
            ? await LandlordModal.findById(_id)
            : await LandlordModal.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'User already exists' });
        }
        
        const date = moment().format("YYYY-MM-DD HH:mm:ss");
        const newUser = {
            firstName,
            LastName,
            email,
            city,
            phone,
            country,
            state,
            postalCode,
            address,
            propertyName,
            countApartment,
            adharCard,
            document: images, // Store the unique filename
            propertyCode,
            registerDate: date,
        };

        const newLandlord = new LandlordModal(newUser);
        await newLandlord.save();

        res.status(201).json({ status: 'success', Landlord: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
const updateLandlord=async(req,res)=>{
    const {id}= req.params;
    const { firstName,
        LastName,
        email,
        phone,
        state,
        country,
        city,
        countApartment,
        postalCode,
        address,
        registerDate,
        propertyName,
        adharCard } = req?.body;
        const newLandlord={
            firstName,
            LastName,
            email,
            address,
            adharCard,
            propertyName,
            registerDate,
            postalCode,
            phone,
            countApartment,
            country,
            state,
            city
        }
    try {
        await LandlordModal.findOneAndUpdate({ _id: id },newLandlord,{new:true});
        res.status(200).send({status:"success",msg:"edit successfully",editLandlord:newLandlord});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg:"something went wrong",status:"error"})
    }
}

const deleteLandlord =async(req,res)=>{
     const {id}= req.params;
    try {
        const deleteLandlord = await LandlordModal.findOneAndDelete({_id:id})
        console.log(deleteLandlord);
        res.status(200).send({status:"success",delete:deleteLandlord})
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error"})
    }
}
// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,  "ImageFolder");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = uuidv4() +"-"+ path.extname(file.originalname);
        cb(null, uniqueSuffix);
    },
});

const upload = multer({
    storage:storage,
    limits: { fileSize: 1000000 }, // 1 MB limit
    fileFilter: (req, file, cb) => {
        const fileTypes = ['.jpeg', '.jpg', '.png', '.gif'];
        const extname = path.extname(file.originalname).toLowerCase();
        if (fileTypes.includes(extname)) {
            return cb(null, true);
        }
        cb('Invalid file format. Only JPEG, JPG, PNG, and GIF files are allowed');
    }
}).single("document");

module.exports = {
    getLandLord,
    postLandLord,
    upload,
    updateLandlord,
    deleteLandlord,
    filterLandlord
};
