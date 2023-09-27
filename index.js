const express = require('express');
const cors = require('cors')
const { connection } = require('./Config/db');
const {adminRoute }= require("./Routes/admin.routes");
const { userRoute } = require('./Routes/user.routes');
const { landLordRouter } = require('./Routes/landLord.routes');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/admin",adminRoute);
app.use("/users",userRoute);
app.use("/landlord",landLordRouter);
app.use('/images', express.static('./images'))
app.listen(port,async()=>{
    try {
        await connection;
        console.log("Database is connected Successfully");
    } catch (error) {
       console.log("Database is not connected successfully")
    }
    console.log(`listening port is ${port}`)
})