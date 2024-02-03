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

//get a user activity
const getUserActivities = async (req, res) => {
    const userActivies = await Activity.find({
        User: req.query.User
    }).populate(ACTIVITY_MODEL_FIELDS.POPULATE)

    res.send(userActivies)
}

//get my activity
const getMyActivity = async (req, res) => {
    const userActivies = await Activity.find({
        User: req.user._id
    }).populate(ACTIVITY_MODEL_FIELDS.POPULATE)

    res.send(userActivies)
}

//students last activity
const getStudentsLastActivity = async (req, res) => {
    const lab = await Lab.findById(req.query.lab)
    if (!lab) res.status(404).send(MESSAGES.LAB_NOT_FOUND)

    const idMap = {}
    const promises = lab.Students.map(async (student) => {
        const latestActivity = await Activity.findOne({ User: student._id })
            .sort({ updatedAt: -1 })
    
        idMap[student._id] = latestActivity ?? {text: '', key: ''}
    });
    
    Promise.all(promises)
        .then(() => {
            res.send(idMap)
        })
}

module.exports = {
    createNewActivity,
    getUserActivities,
    getMyActivity,
    getStudentsLastActivity,
}