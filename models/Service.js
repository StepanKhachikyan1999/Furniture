const { model, Schema } = require('mongoose');

const ServiceSchema = new Schema({
    title: String,
    avatar: String
})

module.exports = model('Service', ServiceSchema)
