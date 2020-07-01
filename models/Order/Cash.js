const { Schema, model } = require('mongoose');

const CashSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    phone: Number,
    address: String,
    city: String,

    title: Array,
    quantity: Array,
    totalValueTemp: Array,
    totalValue: Number,
    now: String,
})

module.exports = model('Cash', CashSchema);