const mongoose = require("mongoose");
const tentantSchema = new mongoose.Schema({
            firstName: {type:String,required:true},
            lastName: { type: String, required: true },
            email: { type: String, required: true } ,
            phone: { type: String, required: true , maxlength:10},
           dateOfBirth: { type: Date, required: true ,default:Date.now},
            address: {
                street: { type: String, required: true },
                city: { type: String, required: true },
                state: { type: String, required: true },
                country: { type: String, required: true },
                zipCode: { type: String, required: true }
            },
            employment: {
                employer: { type: String, required: true },
                jobTitle: { type: String, required: true },
                income: { type: String, required: true }
            },
            rentalHistory: [
                {
                    landlord: { type: String, required: true },
                    property: { type: String, required: true },
                    startDate:{type:Date, default:Date.now},
                    endDate: {type:Date, default:Date.now},
                    reasonForLeaving:{type:String,required:true}
                }
            ],
            references: [
                {
                    name: { type: String, required: true },
                    relationship: { type: String, required: true },
                    phone: { type: String, required: true,maxlength:10 }
                }
            ],
            creditScore: {type:String},
            identification: {
                aadhaarCard: {type:String,maxlength:12}
            }

})

const TentantModal = mongoose.model("Tentant",tentantSchema);
module.exports={
    TentantModal
}