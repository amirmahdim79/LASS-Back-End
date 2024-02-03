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

//create group
const createNewActivity = async (req, res) => {
    const activity = new Activity(_.pick(req.body, ACTIVITY_MODEL_FIELDS.CREATE))
    await activity.save()

    res.send(_.pick(activity, ACTIVITY_MODEL_FIELDS.INFO))
}

module.exports = {
    createNewActivity,
}