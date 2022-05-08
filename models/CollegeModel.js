const mongoose = require('mongoose');

//const ObjectId = mongoose.Schema.Types.ObjectId
//{ name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, logoLink: {mandatory}, isDeleted: {boolean, default: false} }

const CollegeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true

    },
    fullname:{
        type:String,
        required:true,
        trim:true

    },
    logoLink:{
        type:String,
        required:true,


    },
    
    isDeleted: {
        type:Boolean,
        default:false
    }
}, { timestamps: true });

module.exports = mongoose.model('College',CollegeSchema )
   
