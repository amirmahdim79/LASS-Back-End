import Express from 'express';
import winston from 'winston';
import debug from 'debug';

const startupDebugger = debug('app:startup');

const app = Express()

import logging from './startup/logging';
import routes from './startup/routes';
import db from './startup/db';
import config from './startup/config';
import validation from './startup/validation';
import scheduler from './scheduler';

logging();
routes(app);
db();
config(app);
validation();
scheduler();

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('\n')
    startupDebugger(`Listening on port ${port}...`)
    // winston.info(`\nListening on port ${port}...`)
})