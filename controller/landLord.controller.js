const { LandlordModal } = require("../modal/landLord.modal");
const multer = require("multer");
const path = require("path");
const moment = require("moment");
const filterLandlord = async (req, res) => {
    try {
    //     const { firstName, lastName, email, phone,page,limit } = req.query;
    //     const search = {};
    //     if (firstName) {
    //         search.firstName = { $regex: firstName, $options: "i" };
    //     }
    //     if (lastName) {
    //         search.lastName = { $regex: lastName, $options: "i" };
    //     }
    //     if (email) {
    //         search.email = { $regex: email, $options: "i" };
    //     }
    //     if (phone) {
    //         search.phone = { $regex: phone, $options: "i" };
    //     }

    //     // Pagination
    //     const pagination = req.query.page || page;
    //     const limitation = req.query.limit || limit ; // Set a default limit, adjust as needed
    //     const skip = (pagination - 1) * limitation;

    //     // Sorting
    //     const sortField = req.query.sortBy // Set a default field to sort by
    //     const sortOrder = req.query.sortOrder || 'asc'; // Set a default sort order
    //     const sort = { [sortField]: sortOrder === 'asc' ? 1 : -1 };

    //     const searchLand = await LandlordModal.find(search)
    //         .sort(sort)
    //         .skip(skip)
    //         .limit(limit);
    //     const totalRecords = await LandlordModal.countDocuments(search);
    //     const totalPages = Math.ceil(totalRecords / parseInt(limit));
    //     const paginationInfo ={
    //         page: parseInt(pagination),
    //         limit: parseInt(limitation),
    //         totalPages,
    //         totalRecords,
    //     }
    //     res.status(200).send({ status: "success", land:{ searchLand , paginationInfo}, msg:"success" });
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send({ status: "error" });
    // }
        const { page, limit, sortBy, sortOrder,status, ...filters } = req.query;
        const skip = (page - 1) * limit;
        const sort = {};
        if (sortBy) sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        const results = await LandlordModal.find(filters)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));
         const totalRecords = await LandlordModal.countDocuments(filters);
        const totalPages = Math.ceil(totalRecords / parseInt(limit));
         const paginationInfo = {
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages,
            totalRecords,
        };
        res.json({ results, paginationInfo });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const getLandLord = async (req, res) => {
    try {
        const users = await LandlordModal.find({status:true});
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
        status,
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
        console.log(images);
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
            status,
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
        status,
        adharCard } = req.body;
        const newLandlord={
            firstName,
            LastName,
            email,
            address,
            adharCard,
            propertyName,
            registerDate,
            status,
            postalCode,
            phone,
            countApartment,
            country,
            state,
            city
        }
    try {
        await LandlordModal.findOneAndUpdate({ _id: id, status },newLandlord,{new:true});
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
        cb(null,  "images");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix =  path.extname(file.originalname);
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
