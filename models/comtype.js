const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const compTypeSchema = new Schema({
    comp_id: {
        type: Number,
        required: true,
        unique: true,
    },
    comp_type: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true
});

var CompTypeSchema = mongoose.model('compType_info', compTypeSchema);

module.exports = CompTypeSchema;