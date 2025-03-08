const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        default: null,
    },
    lastName: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        default: null,
    },
    birthday: {
        type: String,
        default: null,
    },
    profileImageUrl: {
        type: String,
        default: null,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
