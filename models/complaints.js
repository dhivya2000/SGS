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
        unique:true,
    },
    comp_desc:{
        type: String,
        required: true,
        unique:true,  
    } 
   },{
    timestamps: true
});

var ComplaintSchema = mongoose.model('complaint_info', complaintSchema);

module.exports = ComplaintSchema;