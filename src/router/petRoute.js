const route = require('express').Router()
const petController = require('./../controller/petController')
const authController = require('./../controller/authController')
const multer = require('multer')
// const img = require('')
// Upload img
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/public/images')
    }, filename: (req, file, cb) => {
        cb(null, 'Pet-' + Date.now() + '.jpg')
    }
})
const upload = multer({ storage: storage })

route.route('/getAllPets').get(petController.getAllPets)
// route.use(authController.protect)
route.route('/createPet').post(petController.createPet)
route.route('/:id').patch(petController.updatePet).delete(petController.deletePet).get(petController.getOnePet)
route.route('/uploadImg/:id').patch(upload.single('file'), petController.uploadImg)
module.exports = route