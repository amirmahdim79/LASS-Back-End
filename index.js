const express = require('express');
const winston = require('winston');
const startupDebugger = require('debug')('app:startup')
const app = express()

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')(app);
require('./startup/validation')();
require('./scheduler')();

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('\n')
    startupDebugger(`Listening on port ${port}...`)
    // winston.info(`\nListening on port ${port}...`)
})