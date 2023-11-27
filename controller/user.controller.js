const { UserModal } = require("../modal/user.modal");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const jwtSecret = process.env.JWT_SECRET;

const userRegister = async(req,res)=>{
    const { email,password,firstName,lastName,adharCard,address,country,state,city,postalCode } = req?.body;
    const encrypt = await bcrypt.hash(password, 10);
        try {
            const oldUser = await UserModal.findOne({ email: email })
            if (oldUser) {
                return res.json({ status: "userExists" });
            }
            const newUser = await UserModal.create({
                email, password:encrypt, firstName, lastName, adharCard, address, country, state, city, postalCode
            })
            await newUser.save();
            res.send({ msg:"signup successful!", status:"ok" });
        } catch (err) {
            console.log(err.message);
            res.status(400).send({ error:"signup failed" });
        }
    
}
const userLogin= async(req,res)=>{
    try {
        const { email, password } = req.body;
        let user = await UserModal.findOne({ email });
        if (!user) {
            return res.status(401).send({ msg:"User not found" });
        }
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ email: user.email }, jwtSecret, {
                expiresIn: "15m",
            })
            if (res.status(201)) {
                return res.json({ status: "ok", data: token })
            } else {
                return res.json({ error: "error" });
            }
        }
        res.json({ status: "error", error: "InvAlid Password" });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
}
module.exports={
    userRegister,
    userLogin,
}