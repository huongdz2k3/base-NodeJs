const mongoose = require('mongoose')
const User = require('./User')
const orderSchema = mongoose.Schema({
    status: {
        type: String,
        enum: {
            values: ['placed', 'approved', 'delivered']
        },
        default: 'placed'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    listPets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pet'
        },
    ],
    shipDate: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

orderSchema.virtual('ListPets', {
    ref: 'Pet',
    foreignField: '_id',
    localField: 'listPets'
})

orderSchema.virtual('User', {
    ref: 'User',
    foreignField: '_id',
    localField: 'user'
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order