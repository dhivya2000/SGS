const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announceschema = new Schema({
    reg_title:{
        type: String,
        required: true,
        unique: false,
     
    },
    announcement: {
        type: String,
        required: true,
        unique: false,
    },
    addtime:{
        type: String,
        required:true,
    }
},
    {
        timestamps: true
    });

var AnnounceSchema = mongoose.model('announce_schema', announceschema);

module.exports = AnnounceSchema;