const express = require('express');
const cors = require('cors')
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const session = require('express-session');
const { connection } = require('./Config/db');
const {adminRoute }= require("./Routes/admin.routes");
const { userRoute } = require('./Routes/user.routes');
const { landLordRouter } = require('./Routes/landLord.routes');
const { propertyRouter } = require('./Routes/property.routes');
const { tentantRouter } = require('./Routes/tentant.routes');
const { leaseRouter } = require('./Routes/lease.routes');
const { utilityRouter } = require('./Routes/utility.routes');
const { paymentRouter } = require('./Routes/payment.routes');
const { vacateRouter } = require('./Routes/vacate.routes');
const { systemRouter } = require('./Routes/system.routes');
const { featureRoute } = require('./Routes/feature.routes');
const { amenitiesRoute } = require('./Routes/amenities.routes');
const { utilitiesRoute } = require('./Routes/utilities.routes');
const { unitRoute } = require('./Routes/Unit.routes');
const { amountRouter } = require('./Routes/amount.routes');
const { userRouter } = require('./Routes/userRole.routes');
const { roleRouter } = require('./Routes/role.routes');
const { tentantsRouter } = require('./Routes/tetant.routes');
const { leaseTypeRouter } = require('./Routes/leaseTypes.routes');
const { extraRouter } = require('./Routes/extra.routes');
const { profileRouter } = require('./Routes/Profile.routes');
const app = express();
dotenv.config();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));
app.use('/images', express.static("images"));
app.use('/logo', express.static("logo"))
app.use("/admin",adminRoute);
app.use("/users",userRoute);
app.use("/landlord",landLordRouter);
app.use("/property",propertyRouter);
app.use("/utility",utilityRouter);
app.use("/payment",paymentRouter);
app.use("/tentants",tentantRouter);
app.use("/tentantsSystem", tentantsRouter)
app.use("/tentant",tentantsRouter);
app.use("/leases",leaseRouter);
app.use("/system_lease",leaseTypeRouter);
app.use("/system_extra_charge",extraRouter);
app.use("/system",systemRouter);
app.use("/properties", featureRoute);
app.use("/amenities",amenitiesRoute);
app.use("/utilities",utilitiesRoute);
app.use("/amount",amountRouter)
app.use("/unit",unitRoute);
app.use("/profile-data",profileRouter)
app.use("/user-Role",userRouter);
app.use("/role",roleRouter);
app.use("/vacatenotices", vacateRouter);
app.get("/",(req,res)=>{
    res.send("Welcome to  Apartment Website")
})
app.listen(port,async()=>{
    try {
        await connection;
        console.log("Database is connected Successfully");
    } catch (error) {
       console.log("Database is not connected")
    }
    console.log(`listening port is ${port}`)
})