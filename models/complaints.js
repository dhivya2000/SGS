const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    complaint_id: {
        type: Number,
        required: true,
        unique:true,
    },
    comp_type: {
        type: String,
        required: true,
        unique:false,
    },
    comp_desc:{
        type: String,
        required: true, 
        unique:false,
    },
    dept_name:{
        type:String,
        required:true,
        unique:false,
    },
},
   {
    timestamps: true
});

var ComplaintSchema = mongoose.model('complaint_info', complaintSchema);

module.exports = ComplaintSchema;