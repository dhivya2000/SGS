const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deptSchema = new Schema({
    dept_id: {
        type: Number,
        required: true,
        unique:true,
    },
    dept_name: {
        type: String,
        required: true,
        unique:true,
    } 
   },{
    timestamps: true
});

var DeptSchema = mongoose.model('dept_info', deptSchema);

module.exports = DeptSchema;