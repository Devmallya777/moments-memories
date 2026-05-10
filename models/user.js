const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    email: String,

    otp: String,

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('User', UserSchema);