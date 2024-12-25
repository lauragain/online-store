const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['regular', 'moderador', 'admin'],
        default: 'regular'
    },
    cart: [{ type: Schema.Types.ObjectId, ref: 'product' }]
}, { timestamps: true, versionKey: false })

const User = model('user', userSchema)
module.exports = User