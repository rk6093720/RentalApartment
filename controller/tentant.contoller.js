const { TentantModal } = require("../modal/tentant.modal");

const getTentant = async(req,res)=>{
    try {
        const getNewTentant = await TentantModal.find()
        res.status(200).send({ Tentant: getNewTentant, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" });
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
        res.status(200).send({ AddTentant: post_request, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" }) 
    }

}
const editTentant = async(req,res)=>{
    const {id} = req.params;
    const {
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
        kinName,
        kinPhone,
        kinRelation,
        emergency_name,
        emergency_phone,
        emergency_email,
        emergency_relation,
        emergency_postalAddress,
        emergency_physicalAddress
    } = req.body;
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
        const newEditTentants= await TentantModal.findOneAndUpdate({_id:id},newTentant,{new:true})
        res.status(200).send({ status: "success", msg: "edit successfully", editTentant: newEditTentants });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "something went wrong", status: "error" })
    }
}
const deleteTentant = async(req,res)=>{
    const { id } = req.params;
    try {
        const deleteTentant = await TentantModal.findOneAndDelete({ _id: id })
        res.status(200).send({ status: "success", delete: deleteTentant })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" })
    }

}
module.exports={
    getTentant,
    postTentant,
    editTentant,
    deleteTentant
}