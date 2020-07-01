const { Schema, model } = require('mongoose');

const AdvantageSchema = new Schema({
    title: String,
    description: String,
    avatar: String
})

module.exports = model("Advantage", AdvantageSchema)