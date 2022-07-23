const Pet = require('./../models/Pet')

exports.createPet = async (req, res) => {
    try {
        const newPet = await Pet.create(req.body)
        res.status(200).json({
            status: 'success',
            data: newPet
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            mess: err
        })
    }
}

exports.uploadImg = async (req, res) => {
    try {

        const currentPet = await Pet.findByIdAndUpdate(req.params.id, { img: 'Pet-' + Date.now() + '.jpg' })
        res.status(200).json({
            status: 'success',
            mess: 'file uploaded',
            data: currentPet
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "fail",
            mess: err
        })
    }
}

exports.updatePet = async (req, res) => {
    try {
        const currentPet = await Pet.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            status: 'success'
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "fail",
            mess: err
        })
    }
}

exports.getAllPets = async (req, res) => {
    try {

        const pets = await Pet.find(req.query)
        res.status(200).json({
            status: 'success',
            data: pets
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "fail",
            mess: err
        })
    }
}

exports.deletePet = async (req, res) => {
    try {
        const pets = await Pet.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: 'success',
            mess: 'Delete success'
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "fail",
            mess: err
        })
    }
}

exports.getOnePet = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            data: pet
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "fail",
            mess: err
        })
    }
}