const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    comp_type: {
        type: String,
        required: true,
    },
    comp_desc: {
        type: String,
        required: true,
    },
    dept_name: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    });

var ComplaintSchema = mongoose.model('complaint_info', complaintSchema);

module.exports = ComplaintSchema;