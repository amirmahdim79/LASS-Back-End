const morgan = require('morgan')
const startupDebugger = require('debug')('app:startup')
const config = require('config')
const GLOBALCONST = require('../constant')

module.exports = (app) => {
    //check jwtPrivateKey
    if (!config.get(GLOBALCONST.JWTPR)) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.')
    }

    console.log('\nApplication Name: ' + config.get('name'))

    if (app.get('env') === 'development') {
        console.log(`\n--------------------------`)
        console.log(`|    Development Mode    |`)
        console.log(`--------------------------\n`)
        
        app.use(morgan('tiny'))
        startupDebugger('Using Morgan...')

        console.log('')
    }
}