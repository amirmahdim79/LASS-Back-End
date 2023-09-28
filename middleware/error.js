const winston = require('winston')
const { Log } = require('../models/log')

module.exports = (err, req, res, next) => {
    winston.error(err.message, err)

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
    
    res.on('finish', async () => {
        const newLog = new Log({
            User: req.user,
            type: 'error-res',
            api: {
                ipAddress,
                method,
                url,
                userAgent,
                requestData,
                params,
                query,
                headers
            },
            error: {
                message: err.message,
                err,
            }
        })
        newLog.save()
    })

    res.status(500).send('Something went wrong.')
}