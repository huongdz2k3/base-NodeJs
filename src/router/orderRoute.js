const route = require('express').Router()
const orderController = require('./../controller/orderController')
const authController = require('./../controller/authController')

route.use(authController.protect)
route.route('/buyPet/:id').post(orderController.buyPet)
route.route('/order/:id').get(orderController.getOrder).patch(orderController.updateOrder).delete(orderController.deleteOrder)

module.exports = route