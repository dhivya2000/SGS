const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    student_name: {
        type: String,
        required: true,
        unique: false,
    },
    student_uname: {
        type: String,
        required: true,
        unique: true,

    },
    student_pass:{
        type:String,
        required: true,
        unique:true,
    },
    dept_name: {
        type: String,
        required: true,
        unique: false,
    },
    year : {
       type:Number,
       required:true,
       unique:false,
    },
    email :{
        type:String,
        required:true,
        unique:true,
    },
    
    
},
    {
        timestamps: true
    });

var StudentSchema = mongoose.model('student_details', studentSchema);

module.exports = StudentSchema;