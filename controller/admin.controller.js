const { AdminModal } = require("../modal/admin.modal");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcrypt');
const jwtSecret= process.env.JWT_SECRET;
const nodemailer=require("nodemailer");
const Register = async(req,res)=>{
    const { email, password, firstName, lastName, userType, gstNumber } = req?.body;
    const encrypt = await bcrypt.hash(password,10);
     try {
        const oldUser= await AdminModal.findOne({email:email})
        if(oldUser){
            return res.json({error:"userExists"});
        }
        const newUser= await AdminModal.create({
               firstName,
               lastName,
               email,
               password:encrypt,
               userType,
               gstNumber
        })
            await newUser.save();
         res.send({ msg: "signup successful!",status:"ok" });
        } catch (err) {
            console.log(err.message);
             res.status(400).send({ error: "signup failed" });
        }
}
const Login = async(req,res)=>{
    try {
        const { email, password } = req.body;
        let admin = await AdminModal.findOne({ email });
       if (!admin) {
            return res.status(401).send({ msg: "Admin not found" });
        }
        if(await bcrypt.compare(password,admin.password)){
            const token = jwt.sign({ email: admin.email }, jwtSecret,{
                expiresIn:"15m",
            })
            if(res.status(201)){
                return res.json({ status: "ok", data: token })
            }else{
                return res.json({ error: "error" });
            }
        }
        res.json({ status: "error", error: "InvAlid Password" });  
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
}
const adminData=async(req,res)=>{
    const { token } = req.body;
    try {
        const user = jwt.verify(token, jwtSecret, (err, res) => {
            if (err) {
                return "token expired";
            }
            return res;
        });
        console.log(user);
        if (user == "token expired") {
            return res.send({ status: "error", data: "token expired" });
        }

        const userEmail = user.email;
        AdminModal.findOne({ email: userEmail })
            .then((data) => {
                res.send({ status: "ok", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            });
    } catch (error) {
        res.status(500).send({ status: "error", data: error });
     }
}
const forgetPassword= async(req,res)=>{
    const { email } = req.body;
    try {
        const oldUser = await AdminModal.findOne({ email });
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        const secret = jwtSecret  + oldUser.password;
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id },secret, {
            expiresIn: "5m",
        });
        const link = `http://localhost:8000/reset-password/${oldUser._id}/${token}`;
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user:"rk6093720@gmail.com",
                pass:"ufjdplisgfglmcga",
            },
        });
   var mailOptions = {
            from:email,
            to: email,
            subject: "Password Reset",
            text: link,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        console.log(link);
        // console.log(token);
        res.send(link);
    } catch(e){
        console.log(e);
    }
}
const resetPassword= async(req,res)=>{
    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = await AdminModal.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
    }
    const secret = jwtSecret + oldUser.password;
    try {
        const verify = jwt.verify(token, secret);
        res.render("index", { email: verify.email, status: "Not Verified" });
    } catch (error) {
        console.log(error);
        res.send("Not Verified");
    }

}
const postResetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
   const oldUser = await AdminModal.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
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

        res.render("index", { email: verify.email, status: "verified" });
    } catch (error) {
        console.log(error);
        res.json({ status: "Something Went Wrong" });
    }
}
const Logout = async(req,res)=>{
    const { email } = req.body;
   try {
    const id = await AdminModal.findOne({_id:id})
    if(!id){
        return res.status(404).json({ message: 'Admin not found' });
    }
    const logoutTime = new Date();
    await UserSession.create({ id,email,logoutTime});
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
              user:"rk6093720@gmail.com",
                pass:"ufjdplisgfglmcga",
        },
    })
       var mailOptions = {
           from: email,
           to: email,
           subject: "Logout Confirmation",
           text: "You have successfully logged out from our application",
       };

       transporter.sendMail(mailOptions, function (error, info) {
           if (error) {
               console.log(error);
               return res.status(500).json({ message: '1Error sending email confirmation' });
           } else {
               return res.status(200).json({ message: '2Logged out successfully and email sent' });
           }
       });
   } catch (error) {
       return res.status(500).json({ message: '3Error sending email confirmation' });
   }
}
module.exports={
    Login,
   forgetPassword,
    resetPassword,
    postResetPassword,
    adminData,
    Logout,
    Register
}