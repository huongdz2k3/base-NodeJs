const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const { isValidPassword } = require('mongoose-custom-validators')
const userSchma = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please tell your username!'],
        unique: true
    },
    firstName: {
        type: String,
        required: [true, 'Please tell your first name!'],
    },
    lastName: {
        type: String,
        required: [true, 'Please tell your last name!'],
    },
    email: {
        type: String,
        required: [true, 'Please tell your email!'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Please tell your phone!'],
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        validate: {
            validator: isValidPassword,
            message: 'Password must have at least: 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'
        }
    },
    status: {
        type: Boolean,
        default: true,
    }

})

userSchma.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

const User = mongoose.model('User', userSchma)
module.exports = User