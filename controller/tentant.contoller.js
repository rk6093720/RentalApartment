const { TentantModal } = require("../modal/tentant.modal");

const getTentant = async(req,res)=>{
    try {
        const getNewTentant = await TentantModal.find({})
        res.status(200).json({ Tentant: getNewTentant, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error" });
    }
}
const postTentant= async(req,res)=>{
    const { business_name,
        license_number,
        tax_id,
        business_address,
        business_industry,
        business_description,
        employee_Status,
        employee_position,
        employee_phone,
        employee_email,
        employee_postalAddress,
        employee_physicalAddress,
        tentant_Type,
        firstName,
        lastName,
        gender,
        dob,
        passportNumber,
        martialStatus,
        phone,
        email,
        country,
        city,
        postalCode,
        postalAddress,
        physicalAddress,
        password,
        kinName,
        kinPhone,
        kinRelation,
        emergency_name,
        emergency_phone,
        emergency_email,
        emergency_relation,
        emergency_postalAddress,
        emergency_physicalAddress }= req.body;
    const newTentant={
        business_name,
        license_number,
        tax_id,
        business_address,
        business_industry,
        business_description,
        employee_Status,
        employee_position,
        employee_phone,
        employee_email,
        employee_postalAddress,
        employee_physicalAddress,
        tentant_Type,
        firstName,
        lastName,
        gender,
        dob,
        passportNumber,
        martialStatus,
        phone,
        email,
        country,
        city,
        postalCode,
        postalAddress,
        physicalAddress,
        password,
        kinName,
        kinPhone,
        kinRelation,
        emergency_name,
        emergency_phone,
        emergency_email,
        emergency_relation,
        emergency_postalAddress,
        emergency_physicalAddress
    }
    try {
        const post_request = await TentantModal(newTentant);
        await post_request.save();
        res.status(200).json({ AddTentant: post_request, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error" }) 
    }

}
module.exports={
    getTentant,
    postTentant
}