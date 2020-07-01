const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    phone: Number,
    avatar: String,
    role: String
})

module.exports = model('User', UserSchema);