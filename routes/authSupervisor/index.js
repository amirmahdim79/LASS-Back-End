const { User } = require('../../models/user');
const { MESSAGES, FIELDS } = require('./constants')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const express = require('express');
const Joi = require('joi');
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const GLOBALCONST = require('../../constant');
const { Supervisor } = require('../../models/supervisor');

//auth
router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let sups = await Supervisor.findOne({ email: req.body.email })
    if (!sups) return res.status(400).send(MESSAGES.INVALID_PARAMS)

    const validPassword = await bcrypt.compare(req.body.password, sups.password)
    if (!validPassword) return res.status(400).send(MESSAGES.INVALID_PARAMS)
    
    const token = sups.generateAuthToken()

    res.header('x-auth-token', token);
    res.cookie('x-auth-token', token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 1000,
        secure: true,
    })
    res.send(_.pick(sups, FIELDS.AUTH_RETURN))
})

//check credentials
router.get('/check', async (req, res) => {
    const token = req.cookies['x-auth-token'] ?? req.header('x-auth-token');
    if (!token) return res.clearCookie('x-auth-token').status(400).send('Login again.')

    let user = {}
    try {
        const decoded = jwt.verify(token, config.get(GLOBALCONST.JWTPR))
        req.user = decoded
        
        user = await User.findOne({ _id: decoded._id })
        if (!user) return res.status(400).send(MESSAGES.INVALID_PARAMS)

    } catch (ex) {
        res.clearCookie('x-auth-token')
        return res.status(400).send('Login again.')
    }

    res.send(_.pick(user, FIELDS.AUTH_RETURN))
})

//logout
router.post('/logout', async (req, res) => {
    const token = req.cookies['x-auth-token'] ?? req.header('x-auth-token');
    if (!token) return res.clearCookie('x-auth-token').status(400).send('Login again.')

    try {
        const decoded = jwt.verify(token, config.get(GLOBALCONST.JWTPR))
        req.user = decoded
    } catch (ex) {
        res.clearCookie('x-auth-token')
        return res.status(400).send()
    }

    res.clearCookie('x-auth-token')
    res.send()
})

//validation
const validate = (req) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).required()
    })

    return schema.validate(req)
}

module.exports = router