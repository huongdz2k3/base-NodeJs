const router = require('express').Router()
const authController = require('../controller/authController')
const userController = require('../controller/userController')

router.route('/signup').post(authController.signUp)
router.route('/login').post(authController.login)
router.use(authController.protect)

router.route('/updatePassword').patch(authController.updatePassword)
router.route('/findUser').post(userController.findUser)
router.route('/updateUser').patch(userController.updateUser)
router.route('/deleteMe').patch(userController.deleteMe)


module.exports = router