const dbDebugger = require('debug')('app:db')
const mongoose = require('mongoose')
const winston = require('winston')
const config = require('config')
const { Log } = require('../models/log')

module.exports = () => {
    //Database
    mongoose.connect(config.get('dbpath'))
    .then(() => {
        // winston.info('Connected to MongoDB')
        dbDebugger('Connected to MongoDB')
        return Promise.all([
            Log.ensureIndexes()
        ]);
    })
}