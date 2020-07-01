const { Schema, model } = require('mongoose');

const WithBankSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    phone: Number,
    address: String,

    avatar: Array,
    title: Array,
    quantity: Array,
    totalValueTemp: Array,
    totalValue: Number,
    now: String,

})

module.exports = model('With Bank', WithBankSchema);