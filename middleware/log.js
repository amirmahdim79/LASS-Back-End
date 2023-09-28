const { Log } = require("../models/log")

const log = async (req, res, next) => {
    const startTime = Date.now()
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

    await next()

    const endTime = Date.now()
    const elapsedTime = endTime - startTime
    
    res.on('finish', async () => {
        const newLog = new Log({
            User: req.user,
            type: 'api-call',
            api: {
                ipAddress,
                method,
                url,
                elapsedTime,
                userAgent,
                requestData,
                params,
                query,
                headers
            }
        })
        newLog.save()
    })
}

module.exports = log