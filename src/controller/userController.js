const User = require('./../models/User')

exports.findUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                mes: "user does not exist"
            })
        }
        res.status(200).json({
            status: 'success',
            data: user
        })
    } catch (err) {
        res.status(404).json({
            err
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.user._conditions._id.id
        const user = await User.findById(id)
        if (!user.status) {
            return res.status(404).json({
                mess: "This account already deleted"
            })
        }
        const userUpdated = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: 'success',
            data: userUpdated
        })
    } catch (err) {
        res.status(404).json({
            err
        })
    }
}

exports.deleteMe = async (req, res) => {
    try {
        const id = req.user._conditions._id.id
        const user = await User.findById(id)
        user.status = false
        user.save()
        res.status(200).json({
            status: 'success',
            mess: 'Delete success'
        })
    } catch (err) {
        res.status(404).json({
            err
        })
    }
}