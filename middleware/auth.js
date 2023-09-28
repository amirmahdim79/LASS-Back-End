const jwt = require('jsonwebtoken')
const config = require('config')
const GLOBALCONST = require('../constant/index')

const auth = (req, res, next) => {
    const token = req.header('x-auth-token') || req.cookies['x-auth-token'];
    if (!token) return res.status(401).send('Access denied.')

    try {
        const decoded = jwt.verify(token, config.get(GLOBALCONST.JWTPR))
        req.user = decoded
        next()
    } catch (ex) {
        res.clearCookie('x-auth-token')
        res.status(400).send('Invalid token.')
    }
}

module.exports = auth