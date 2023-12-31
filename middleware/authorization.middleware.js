const jwt = require("jsonwebtoken");
require("dotenv").config();
const adminKey = process.env.ADMIN;
const authorization = (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (token) {
        jwt.verify(token, adminKey, (err, decoded) => {
            if (decoded) {
                console.log(" admin oauth decoded");
                req.body = decoded;
                next();
            } else {
                console.log(" admin not decoded ");
                return res.status(401).send({ err: "you are not authorized" });
            }
        });
    } else {
        console.log("token is not in oauth middleware");
        return res
            .status(401)
            .send({ err: "you have no any token for authorization" });
    }
};

module.exports = { authorization };