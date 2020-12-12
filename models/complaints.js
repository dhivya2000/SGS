const mongoose = require('mongoose');
const Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');
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
    stud_uname:{
        type:String,
        required: true,
    },
    comp_status:{
        type:Boolean,
        required:true,
        default:false,
    }
},
    {
        timestamps: true
    });
    
    autoIncrement.initialize(mongoose.connection); 
    complaintSchema.plugin(autoIncrement.plugin, 'ComplaintSchema');

  var ComplaintSchema = mongoose.model('complaint_info', complaintSchema);
  module.exports = ComplaintSchema;

