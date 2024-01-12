const { Data } = require('../../models/data');
const { Constant } = require('../../models/constant');
const { User } = require('../../models/user');
const { MESSAGES } = require('./constants')
const _ = require('lodash')

//collect data
const collectData = async (req, res) => {
    let user = null
    if (req.user)
        user = await User.findById(req.user._id)
    
    const action = req.params.action
    const payload = req.body || {}

    const newData = new Data({
        action,
        payload,
    })

    if (user) newData.User = user

    newData.save()

    res.send()
}

module.exports = {
    collectData,
}