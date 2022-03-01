const { Schema, model } = require('mongoose');

const ContactUsSchema = new Schema({
    name: String,
    email: String,
    theme: String,
    message: String,
})

module.exports = model("ContactUs", ContactUsSchema)