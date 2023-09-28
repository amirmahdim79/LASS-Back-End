const jwt = require('jsonwebtoken')
const config = require('config')
const GLOBALCONST = require('../constant/index')

const authCheck = (req, res, next) => {
    const token = req.header('x-auth-token') || req.cookies['x-auth-token'];

    if (token) {
        try {
            const decoded = jwt.verify(token, config.get(GLOBALCONST.JWTPR))
            req.user = decoded
            next()
        } catch (ex) {
            res.clearCookie('x-auth-token')
            res.status(400).send('Invalid token.')
        }
    } else {
        req.user = null
        next()
    }
}

module.exports = authCheck