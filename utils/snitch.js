const { Log } = require("../models/log");

const CREATE_LOG = (req, type) => {
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

    const newLog = new Log({
        User: req.user,
        type: type,
        api: {
            ipAddress,
            method,
            url,
            userAgent,
            requestData,
            params,
            query,
            headers
        }
    })
    newLog.save()
}

module.exports = {
    CREATE_LOG,
}