const { LandlordModal } = require("../modal/landLord.modal");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
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
        document,
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
        // let image = null;
        // if (req.file) {
        //     const uniqueFilename = uuidv4() + path.extname(req.file.originalname);
        //     const imagePath = path.join(__dirname, '..', 'images', uniqueFilename);
        //     await fs.rename(req.file.path, imagePath);
        //     image = uniqueFilename; // Save the unique filename to the database
        // }
        //  console.log(image)
        let image = null;
        if (req.file) {
            image = req.file.path; // Save the unique filename to the database
        }
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
            document: image, // Store the unique filename
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

fs.mkdir('images', { recursive: true })
    .then(() => console.log('Directory created'))
    .catch(err => console.error('Error creating directory: ', err));

// Define a function to handle file uploads
const handleFileUpload = async (req, res, next) => {
    try {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path.join(__dirname, 'images')); // Use an absolute path for the "images/" folder
            },
            filename: function (req, file, cb) {
                const uniqueSuffix = file.fieldname + "-" + uuidv4() + path.extname(file.originalname);
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
        }).single("document");

        upload(req, res, (err) => {
            if (err) {
                console.error(err);
                res.status(400).json({ status: 'error', message: 'File upload failed', error: err });
            } else {
                next(); // Continue processing after successful upload
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
module.exports = {
    getLandLord,
    postLandLord,
    handleFileUpload,
    updateLandlord,
    deleteLandlord,
    filterLandlord
};
