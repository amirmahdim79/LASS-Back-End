const { User } = require('../../models/user');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const crypto = require('crypto');
const { Group } = require('../../models/group');
const { GROUP_FIELDS } = require('../../models/group/constatns');
const { Lab } = require('../../models/lab');
const { MESSAGES } = require('./constants');
const { Activity } = require('../../models/activity');
const { Bounty } = require('../../models/bounty');
const { BOUNTY_FIELDS } = require('../../models/bounty/constatns');
const { Notification } = require('../../models/notification');

//get all bounties
const getNotifications = async (req, res) => {
    const notifications = await Notification.find({
        User: req.user._id
    }).sort({
        createdAt: -1
    }).limit(10)

    res.send(notifications)
}

//read notification
const readNotification = async (req, res) => {
    const notif = await Notification.findOne({
        User: req.user._id,
        _id: req.query.id
    })

    notif.read = true

    await notif.save()

    res.send('Read notification')
}

module.exports = {
    getNotifications,
    readNotification,
}