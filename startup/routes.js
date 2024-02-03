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
const admin = require('../routes/admin');
const user = require('../routes/users');
const labs = require('../routes/labs');
const data = require('../routes/data');
const supervisor = require('../routes/supervisors');
const path = require('../routes/paths');
const milestone = require('../routes/milestones');
const task = require('../routes/tasks');
const files = require('../routes/files')
const tags = require('../routes/tags')
const events = require('../routes/events')
const groups = require('../routes/groups')
const forum = require('../routes/forum')
const presence = require('../routes/presence')
const userTask = require('../routes/userTask')
const supsTask = require('../routes/supsTask')
const activity = require('../routes/activity')
const documents = require('../routes/documents')

module.exports = (app) => {
    //Middlewares
    app.use(cors({
        origin: [
            'http://localhost:3000',
            'http://192.168.1.7:3000',
            'http://localhost:3001',
            'http://192.168.1.7:3001',
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
    app.use('/api-lass/user', user)
    app.use('/api-lass/labs', labs)
    app.use('/api-lass/data', data)
    app.use('/api-lass/supervisor', supervisor)
    app.use('/api-lass/admin', admin)
    app.use('/api-lass/path', path)
    app.use('/api-lass/milestone', milestone)
    app.use('/api-lass/task', task)
    app.use('/api-lass/files', files)
    app.use('/api-lass/tags', tags)
    app.use('/api-lass/events', events)
    app.use('/api-lass/groups', groups)
    app.use('/api-lass/forum', forum)
    app.use('/api-lass/presence', presence)
    app.use('/api-lass/userTasks', userTask)
    app.use('/api-lass/supsTasks', supsTask)
    app.use('/api-lass/activity', activity)
    app.use('/api-lass/documents', documents)

    //Custom middlewares
    app.use(logger)
    app.use(error)
}