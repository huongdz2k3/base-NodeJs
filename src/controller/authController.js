const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)
    const cookieOption = {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000)
    }
    res.cookie('jwt', token, cookieOption)
    res.status(statusCode).json({
        status: 'success',
        token,
        data: user
    })
}

exports.signUp = async (req, res) => {
    try {
        const user = await User.create(req.body)
        createSendToken(user, 200, res)
    } catch (err) {
        console.log(err)
        res.status(400).json({
            err
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).json({
                status: "fail",
                mess: "Please provide email or password"
            })
        }
        const user = await User.findOne({ email: email })
        console.log(user)
        let check = await bcrypt.compare(password, user.password)
        if (!check) {
            return res.status(404).json({
                status: "fail",
                mess: "Incorrect Password"
            })
        }
        createSendToken(user, 200, res)

    } catch (err) {
        console.log(err)
        res.status(400).json({
            err
        })
    }
}

exports.protect = async (req, res, next) => {
    try {
        // Get token and check
        let token
        if (req.headers.authorization && req.headers.authorization.startWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }
        if (!token) {
            return res.status(400).json({
                mess: "Please login"
            })
        }
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // Check user is exist
        const user = User.findById(decoded)
        if (!user) {
            res.status(400).json({
                mess: "The user belonging to this user does not longer exist."
            })
        }
        req.user = user
        next()
    } catch (err) {
        console.log(err)
        res.status(400).json({
            err
        })
    }
}
