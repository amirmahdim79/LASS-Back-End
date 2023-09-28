const jwt = require('jsonwebtoken')
const config = require('config')
const GLOBALCONST = require('../constant/index')
const { User } = require('../models/user')
const { Log } = require('../models/log')

const isAdmin = async (req, res, next) => {
    const token = req.header('x-auth-token') || req.cookies['x-auth-token'];
    if (!token) return res.status(401).send('Access denied.')

    try {
        const decoded = jwt.verify(token, config.get(GLOBALCONST.JWTPR))

        const user = await User.findOne({ _id: decoded._id })
        if (!user) throw new Error('User not found.');

        if (!user.permissions.includes('admin')) throw new Error('User is not an admin.');

        req.user = decoded
        next()

        const ipAddress = req.id || req?.connection.remoteAddress
        const userAgent = req.headers['user-agent']
        const {
            method,
            originalUrl: url,
            body: requestData,
            params,
            query,
            headers
        } = req;

        const newLog = new Log({
            User: req.user,
            type: 'admin-action',
            api: {
                ipAddress,
                method,
                url,
                userAgent,
                requestData,
                params,
                query,
                headers
            }
        })
        newLog.save()

    } catch (ex) {
        res.clearCookie('x-auth-token')
        res.status(400).send('Invalid token.')
    }
}

const isSuperAdmin = async (req, res, next) => {
    const token = req.header('x-auth-token') || req.cookies['x-auth-token'];
    if (!token) return res.status(401).send('Access denied.')

    try {
        const decoded = jwt.verify(token, config.get(GLOBALCONST.JWTPR))

        const user = await User.findOne({ _id: decoded._id })
        if (!user) throw new Error('User not found.');

        if (!user.permissions.includes('super-admin')) throw new Error('User is not a super admin.');

        req.user = decoded
        next()
    } catch (ex) {
        res.clearCookie('x-auth-token')
        res.status(400).send('Invalid token.')
    }
}

module.exports = {
    isAdmin,
    isSuperAdmin
}