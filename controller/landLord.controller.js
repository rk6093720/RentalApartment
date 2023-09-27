const { LandlordModal } = require("../modal/landLord.modal");
const multer = require("multer");
const path = require('path');
const getLandLord = async(req,res)=>{
    try {
        const user = await LandlordModal.find({});
        res.status(201).send({ Landlord: user, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(201).send({ status: "error" });
    }
}

//post request for landLord;
const postLandLord = async (req, res) => {
    const { firstName, LastName, email, city, phone, country, _id, state, postalCode, address, registerDate, propertyName, countApartment, adharCard, propertyCode } = req.body;
    try {
        // Check if a user with the same email or _id exists
        const existingUser = _id
            ? await LandlordModal.findById(_id)
            : await LandlordModal.findOne({ email });
            if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'User already exists' });
           }
        // Check if req.file exists and get its filename
        let documentFilename = null;
        if (req.file) {
            documentFilename = req.file.path;
        }
    
       // Create a new Landlord instance
        const newUser = new LandlordModal({
            firstName,
            LastName,
            email,
            city,
            phone,
            country,
            state,
            postalCode,
            address,
            registerDate:new Date(),
            propertyName,
            countApartment,
            adharCard,
            document: documentFilename,
            propertyCode,
        });
         // Save the new user to the database
        await newUser.save();
        // Respond with a success message and the created user
        res.status(201).json({ status: 'success', Landlord: newUser });
    } catch (error) {
        console.error(error);
         // Handle the error and send an appropriate response
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "images");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        return cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});
const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single("document");

module.exports={
    getLandLord,
    postLandLord,
    upload
}
