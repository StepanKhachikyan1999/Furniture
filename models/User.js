const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    phone: Number,
    avatar: String,
    role: String,

    cart: {
        items: [
            {
                saleId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Sale'
                }
            }
        ]
    }
})

module.exports = model('User', UserSchema);