const { Schema, model } = require('mongoose');

const PaymentAmeria  = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },

    title: Array,
    quantity: Array,
    totalValueTemp: Array,
    totalValue: Number,
    now: String,
    delivery_price: Number,
    ClientID:Array,
    Username:Array,
    Password:Array,
    OrderID:Array,
    amount:Array,

    user: {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    paymentStatus: Boolean,
})

module.exports = model('online Bank', PaymentAmeria );