const { User } = require('../../models/user');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const crypto = require('crypto');
const { Group } = require('../../models/group');
const { GROUP_FIELDS } = require('../../models/group/constatns');
const { Lab } = require('../../models/lab');
const { MESSAGES } = require('./constants');
const { Activity } = require('../../models/activity');
const { ACTIVITY_MODEL_FIELDS } = require('../../models/activity/constatns');
const { checkEmailFormat } = require('../../utils/emailRegexChecker');
const MAIL_MAN = require('../../utils/mailMan/mailMan')();

//create group
const sendInvite = async (req, res) => {
    const email = req.body.email
    if (!checkEmailFormat(email)) return res.status(400).send('Bad email')

    MAIL_MAN.SEND(email, 'You have successfully joined ILAB registration list!', 'Registered to ILAB')

    res.send('success')
}

module.exports = {
    sendInvite,
}