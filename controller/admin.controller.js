const { AdminModal } = require("../modal/admin.modal");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcrypt');
const jwtSecret= process.env.JWT_SECRET;
const nodemailer=require("nodemailer");
const Login = async(req,res)=>{
    try {
        const { email, password } = req?.body;
        if (email === "admin@gmail.com") {
            const admin = await AdminModal.findOne({ email: "admin@gmail.com"})
            if (!admin) {
            const encrypt = await bcrypt.hash(password, 10);
            const newAdmin = await AdminModal({
                email,
                password: encrypt,
                userType: "admin", 
            });
            await newAdmin.save();
           }
            if (await bcrypt.compare(password, admin.password)) {
                const token = jwt.sign({ email: admin.email }, jwtSecret, {
                    expiresIn: "5m",
                })
                if (res.status(201)) {
                    return res.json({ status: "success", data: token })
                }
            }
        }
      return  res.json({ status: "error", error: "InvAlid Password" });  
    } catch (error) {
        console.error("Error in login:", error);
      return  res.status(500).send({ msg: "Internal Server Error" });
    }
}
// const adminData=async(req,res)=>{
//     const { token } = req.body;
//     try {
//         const user = jwt.verify(token, jwtSecret, (err, res) => {
//             if (err) {
//                 return "token expired";
//             }
//             return res;
//         });
//         console.log(user);
//         if (user == "token expired") {
//             return res.send({ status: "error", data: "token expired" });
//         }

//         const userEmail = user.email;
//         AdminModal.find( userEmail )
//             .then((data) => {
//                 res.send({ status: "success", data: data });
//             })
//             .catch((error) => {
//                 res.send({ status: "error", data: error });
//             });
//     } catch (error) {
//         res.status(500).send({ status: "error", data: error });
//      }
// }
const forgetPassword= async(req,res)=>{
    const { email } = req.body;
    try {
        const oldUser = await AdminModal.findOne({email} );
        if (!oldUser) {
            return res.json({ status: "admin Not Exists!!" });
        }
        const secret = jwtSecret  + oldUser.password;
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id },secret, {
            expiresIn: "15m",
        });
        const setUserToken = await AdminModal.findByIdAndUpdate({_id:oldUser._id},{verifyToken:token,new:true})
        const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}`;
        if(setUserToken){
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user:"rk6093720@gmail.com",
                pass:"ufjdplisgfglmcga",
            },
        });
   var mailOptions = {
            from:"rk6093720@gmail.com",
            to: email,
            subject: "Password Reset",
            text: link,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(401).json({message:"email not send"})
            } else {
                console.log("Email sent: " + info.response);
                return res,staus(201).json({message:"email sent successfully"})
            }
        });
    }
     return   res.send({link, status:"success"});
    } catch(e){
        res.status(500).send({e:"do not sent on email",  status: "error" });
    }
}
// get request for reset password 
const resetPassword= async(req,res)=>{
    const { id, token } = req.params;
    console.log(id,token);
    // console.log(req.params);
    const oldUser = await AdminModal.findOne({_id: id, verifyToken: token });
    if (!oldUser) {
        return res.json({ status: "Admin Not Exists!!" });
    }
    const secret = jwtSecret + oldUser.password;
    try {
        const verify = jwt.verify(token, secret);
     return    res.send({email:verify.email,id:verify._id,status:"verified"})
    } catch (error) {
     return   res.send("Not Verified");
    }
}
//post request of forget-password
const postResetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
   const oldUser = await AdminModal.findOne({_id: id ,verifyToken:token});
    if (!oldUser) {
        return res.json({ status: "Admin Not Exists!!" });
    }
    const secret = jwtSecret + oldUser.password;
    try {
        const verify = jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password, 10);
        await AdminModal.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: encryptedPassword,
                },
            }
        );

     return   res.send( { email: verify.email,verifyToken:verify.token,id:verify._id, status: "verified" });
    } catch (error) {
        console.log(error);
       return res.json({ status: "Something Went Wrong" });
    }
}
const Logout = async (req, res) => {
    const { id } = req.params;

    try {
        // Assuming you have a UserSession model to track logout times
        const logoutTime = new Date();

        // Create a new UserSession document to record the logout time
        const userSession = new UserSession({
            id, // Assuming id is the user's ID
            logoutTime,
        });

        // Save the UserSession document to your database
        await userSession.save();

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error logging out' });
    }
};

const putProfile= async(req,res)=>{
    const {id}= req?.params;
    const {  firstName, lastname, country, state, city } = req?.body;
   try {
       const admin ={
        firstName,lastname,country,state,city
       }
        const adminData = await AdminModal.findOneAndUpdate({_id:id,admin, new:true})
        await adminData.save();
        res.status(200).send({AddAdmin: adminData, status:"success"})
   } catch (error) {
       res.status(500).send({  status: "error" })
   }
}

const getProfile = async (req, res) => {
    try {
        const adminData = await AdminModal.find();
        res.status(200).send({ Admin:adminData, status: "success" })
    } catch (error) {
        res.status(500).send({ status: "error" })
    }
}
module.exports={
    Login,
   forgetPassword,
    resetPassword,
    postResetPassword,
    // adminData,
    Logout,
    putProfile,
    getProfile
}