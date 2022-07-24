const Order = require('./../models/Order')
const Pet = require('./../models/Pet')

function caculate(price, quantity) {
    let tax = 0
    if (quantity === 1) tax = 0.1
    else if (quantity > 1 && quantity < 5) tax = 0.08
    else if (quantity > 5 && quantity < 10) tax = 0.05
    else if (quantity > 10) {
        price -= price * 0.05
        tax = 0.1
    }
    return price + price * tax
}

exports.buyPet = async (req, res) => {
    try {
        // Get order from user id
        const id = req.user._conditions._id.id
        const order = await Order.findOne({ user: id })
        // console.log(order.listPets)
        // If not exist => create
        if (!order) {
            const newOrder = await Order.create({
                user: id,
                listPets: req.params.id,
                shipDate: req.body.shipDate
            })
            return res.status(200).json({
                status: 'success',
                data: newOrder
            })
        }
        else {
            // check pet is exist or status : false
            const currentPet = await Pet.findById(req.params.id)
            if (!currentPet || currentPet.status === false) {
                return res.status(404).json({
                    status: "fail",
                    mess: "This pet does not exist"
                })
            }
            order.listPets.push(req.params.id)
            currentPet.status = false
            await order.save()
            await currentPet.save()
            return res.status(200).json({
                status: 'success',
                data: order
            })
        }
        // else => add 
    } catch (err) {
        res.status(404).json({
            status: "fail",
            err
        })
    }
}

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('ListPets').populate('User')
        const listPets = await Promise.all(order.listPets.map(el => Pet.findById(el)))
        let price = 0
        for (let i = 0; i < listPets.length; i++) price += listPets[i].price
        console.log(price)
        res.status(200).json({
            status: 'success',
            data: order,
            total: caculate(price, listPets.length)
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: "fail",
            err
        })
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (order.status === 'approved' || order.status === 'delivered') {
            return res.status(400).json({
                status: 'fail',
                mess: "You can not update this order"
            })
        }
        order.status = req.body.status
        order.save()
        res.status(200).json({
            status: 'success',
            data: order
        })
    }
    catch (err) {
        console.log(err)
        res.status(404).json({
            status: "fail",
            err
        })
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (order.status === 'approved' || order.status === 'delivered') {
            return res.status(404).json({
                status: 'fail',
                mess: 'You can not detele this order'
            })
        }
        await order.delete()
        return res.status(200).json({
            status: 'success',
            mess: 'Delete successfully'
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: "fail",
            err
        })
    }
}