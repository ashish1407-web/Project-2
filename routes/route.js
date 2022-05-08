const express = require('express');
const router = express.Router();


const interncontrol=require("../controllers/interncontroller")
const collegecontrol=require("../controllers/collegecontroller")

router.post("/functionup/colleges",collegecontrol.createcollege)
router.post("/functionup/interns",interncontrol.createIntern)
router.get("/functionup/collegeDetails",collegecontrol.finddata)





module.exports = router;

