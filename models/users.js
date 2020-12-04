const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    u_name: {
        type: String,
        required: true,
        unique: true,
    },
    u_pass: {
        type: String,
        required: true,
        unique: true,
    },
    is_admin: {
        type: Boolean,
        required: true,
        unique: false,
    }

}, {
    timestamps: true
});

var UserSchema = mongoose.model('user_info', userSchema);

module.exports = UserSchema;