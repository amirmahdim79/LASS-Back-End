const helmet = require('helmet')
const logger = require('../middleware/logger')
const error = require('../middleware/error')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');

const home = require('../routes/home');
const auth = require('../routes/auth');
const authAdmin = require('../routes/authAdmin');
const authSupervisor = require('../routes/authSupervisor');
const admins = require('../routes/admin');
const users = require('../routes/users');
const labs = require('../routes/labs');
const data = require('../routes/data');
const supervisors = require('../routes/supervisors');

module.exports = (app) => {
    //Middlewares
    app.use(cors({
        origin: [
            'http://localhost:3000',
            'http://192.168.1.7:3000',
        ],
        credentials: true,
        exposedHeaders: ['x-auth-token']
    }))
    app.use(express.json())
    app.use(cookieParser())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(helmet())

    //Routes
    app.use('/api-lass', home)
    app.use('/api-lass/auth', auth)
    app.use('/api-lass/auth/admin', authAdmin)
    app.use('/api-lass/auth/supervisor', authSupervisor)
    app.use('/api-lass/user', users)
    app.use('/api-lass/labs', labs)
    app.use('/api-lass/data', data)
    app.use('/api-lass/supervisor', supervisors)
    app.use('/api-lass/admin', admins)

    //Custom middlewares
    app.use(logger)
    app.use(error)
}