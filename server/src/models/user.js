const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: { type: String },
    dateOfBirth :{ type: String},
    address: { type: String},
    gender: { 
        type: String, 
        enum: ['male', 'female', 'other'], 
        default: 'male' 
    },
    phoneNumber: { type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userImage: { type: String }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;