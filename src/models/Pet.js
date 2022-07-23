const mongoose = require('mongoose')


const petSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Please write the category'],
    },
    name: {
        type: String,
        required: [true, 'Please write the name'],

    },
    tags: {
        type: String,
        required: [true, 'Please write the tag'],
    },
    status: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: [true, 'Please write the price']
    }
})
const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet