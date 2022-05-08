const Internmodel = require('../models/InternModel');
const collegemodel = require('../models/CollegeModel');
const valid = function (value) {

    if (typeof value !== "string" || value.trim().length == 0) { return false }
    return true
}

const createIntern = async function (req, res){
    try{

    let intern=req.body
    if (!intern.name) { return res.status(400).send({ status: false, message: "name  is required" }) }
    if (!intern.email) { return res.status(400).send({ status: false, message: "email is required" }) }

    if (!intern.mobile) { return res.status(400).send({ status: false, message: "mobile no. is required" }) }

    if (!intern.collegeName) { return res.status(400).send({ status: false, message: " collegename is required" }) }
    if (!valid(intern.name)) { return res.status(400).send({ status: false, message: "name is invalid" }) }
    if (!valid(intern.collegeName)) { return res.status(400).send({ status: false, message: "collegename is invalid" }) }
    let pattern = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/

    if (!pattern.test(intern.email)) { return res.status(400).send({ status: false, message: "email is not valid" }) }
    const emailId= await Internmodel.find({email:intern.email});
    if(emailId.length!=0) return res.status(401).send({status:false,msg:"Email is Already Exist"});
    
  
       
    let check=/^(\+\d{1,3}[- ]?)?\d{10}$/

    if(!check.test(intern.mobile)){ return res.status(400).send({ status: false, message: "mobile number is not valid" }) }
    const mobilenumber=await Internmodel.find({mobile:intern.mobile});
    if(mobilenumber!=0) return res.status(401).send({status:false,msg:"Phone is Already Exist"})
    if (intern.isDeleted) { if (typeof intern.isDeleted !== "boolean") { return res.status(400).send({ status: false, message: "value must be in boolean" }) } }
    let collegeFind = await collegemodel.findOne({ name:intern.collegeName },{id:1})
     console.log(collegeFind); 
    if (!collegeFind) {
          return res.status(400).send({ status: false, msg: "College Name is invalid" })
        }
   let internCreated = await Internmodel.create(intern)
   console.log(internCreated);
   internCreated.collegeId=collegeFind._id.toString()
   internCreated.save()
   res.status(201).send({ status:true,data: internCreated })
   }
   catch (error){
    res.status(500).send(error.message)

}

}

module.exports.createIntern=createIntern
