const { User } = require('../../models/user');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const crypto = require('crypto');
const { MILESTONES_FIELD, MESSAGES } = require('./constants');
const { Lab } = require('../../models/lab');
const { Supervisor } = require('../../models/supervisor');
const { Path } = require('../../models/path');
const { Milestone } = require('../../models/milestone');

//post create milestone for path(Sups)
const postCreateMilestone = async (req, res) => {
    const lab = await Lab.findOne({ Supervisor: req.user._id })
    if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)

    const path = await Path.findOne({ _id: req.body.Path, Lab: lab._id })
    if (!path) return res.status(400).send(MESSAGES.PATH_NOT_FOUND)

    const milestone = new Milestone(_.pick(req.body, MILESTONES_FIELD.CREATE))

    milestone.Path = path._id
    await milestone.save()

    path.Milestones.push(milestone._id)
    path.save()

    res.send(_.pick(milestone, MILESTONES_FIELD.CREATE_RES))
}

module.exports = {
    postCreateMilestone
}