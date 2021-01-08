const mongoose = require('mongoose');
const Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');
//const Comment = require('./comment');

const Comment = new Schema({
    username: String,
    text: String
  });

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
        type:String,
        required:true,
        default:"false",
    },
    comments: [Comment],
    },
    {
        timestamps: true
    });
    
    autoIncrement.initialize(mongoose.connection); 
    complaintSchema.plugin(autoIncrement.plugin, 'ComplaintSchema');

  var ComplaintSchema = mongoose.model('complaint_info', complaintSchema);
  module.exports = ComplaintSchema;

