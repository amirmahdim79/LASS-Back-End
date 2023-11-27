const jwt = require('jsonwebtoken')
const config = require('config')
const GLOBALCONST = require('../constant/index')
const { User } = require('../models/user')
const { Log } = require('../models/log')
const { Admin } = require('../models/admin')
const { Supervisor } = require('../models/supervisor')
const { CREATE_LOG } = require('../utils/snitch')

const isSuperAdmin = async (req, res, next) => {
    const token = req.header('x-auth-token') || req.cookies['x-auth-token'];
    if (!token) return res.status(401).send('Access denied.')

    try {
        const decoded = jwt.verify(token, config.get(GLOBALCONST.JWTPR))

        const admin = await Admin.findOne({ _id: decoded._id })
        if (!admin) throw new Error('Admin not found.');

        if (!admin.permissions.includes('super-admin')) throw new Error('Is not super admin');

        req.user = decoded
        next()

        CREATE_LOG(req, 'super-admin-action')

    } catch (ex) {
        res.clearCookie('x-auth-token')
        res.status(400).send('Invalid token.')
    }
}

const isSupervisor = async (req, res, next) => {
    const token = req.header('x-auth-token') || req.cookies['x-auth-token'];
    if (!token) return res.status(401).send('Access denied.')

    try {
        const decoded = jwt.verify(token, config.get(GLOBALCONST.JWTPR))
        const sups = await Supervisor.findOne({ _id: decoded._id })
        if (!sups) throw new Error('Supervisor not found.');

        req.user = decoded
        next()

        CREATE_LOG(req, 'supervisor-action')

    } catch (ex) {
        res.clearCookie('x-auth-token')
        res.status(400).send('Invalid token.')
    }
}


const isCoSupervisor = async (req, res, next) => {
    const token = req.header('x-auth-token') || req.cookies['x-auth-token'];
    if (!token) return res.status(401).send('Access denied.')

    try {
        let isSups = false
        const decoded = jwt.verify(token, config.get(GLOBALCONST.JWTPR))
        let user = await Supervisor.findOne({ _id: decoded._id })
        if (!user) {
            user = await User.findOne({ _id: decoded._id })
        } else {
            isSups = true
        }
        if (!user) throw new Error('Supervisor not found.');

        if (!isSups && !user.permissions.includes['co-supervisor']) throw new Error('Access denied.');

        req.user = decoded
        next()

        CREATE_LOG(req, 'supervisor-action')

    } catch (ex) {
        res.clearCookie('x-auth-token')
        res.status(400).send('Invalid token.')
    }
}

const hasPermissions = (permissions = []) => {
    return async (req, res, next) => {
        const token = req.header('x-auth-token') || req.cookies['x-auth-token'];
        if (!token) return res.status(401).send('Access denied.')
    
        try {
            let isSups = false
            const decoded = jwt.verify(token, config.get(GLOBALCONST.JWTPR))
            let user = await Supervisor.findOne({ _id: decoded._id })
            if (!user) {
                user = await User.findOne({ _id: decoded._id })
            } else {
                isSups = true
            }
            if (!user) throw new Error('User not found.');

            const hasAllPermissions = permissions.every(permission => user.permissions.includes(permission));
    
            if (!isSups && !hasAllPermissions) throw new Error('Access denied.');
    
            req.user = decoded
            next()
    
            CREATE_LOG(req, 'supervisor-action')
    
        } catch (ex) {
            // res.clearCookie('x-auth-token')
            res.status(400).send('No permission.')
        }
    }
}

module.exports = {
    isSuperAdmin,
    isSupervisor,
    isCoSupervisor,
    hasPermissions,
}