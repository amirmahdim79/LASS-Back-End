const jwt = require('jsonwebtoken')
const config = require('config')
const GLOBALCONST = require('../constant/index')
const { Lab } = require('../models/lab')

const MESSAGES = {
    LAB_NOT_FOUND: 'Lab not found.',
}
    
const labCheck = async (req, res, next) => {
    const user = req.query.labUserId ?? req.user._id
    const lab = await Lab.findOne({
        _id: req.query.lab,
        $or: [
            { Students: { $in: [user] } },
            { Supervisor: user }
        ]
    })
    if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)

    next()
}

module.exports = labCheck