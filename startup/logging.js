const startupDebugger = require('debug')('app:startup')
const winston = require('winston')
const GLOBALCONST = require('../constant')

require('express-async-errors')

module.exports = () => {
    //catching uncaught exceptions
    process.on('uncaughtException', (ex) => {
        startupDebugger('WE GOT AN UNCAUGHT EXCEPTION')
        startupDebugger(ex.message, ex)
        winston.error(ex.message, ex)
        process.exit(1)
    })

    //catching unhandled rejection
    process.on('unhandledRejection', (ex) => {
        startupDebugger('WE GOT AN UNHANDLED REJECTION')
        startupDebugger(ex.message, ex)
        winston.error(ex.message, ex)
        process.exit(1)
    })

    //adding log file
    winston.add(new winston.transports.File({ filename: GLOBALCONST.LOG_FILENAME }))
}