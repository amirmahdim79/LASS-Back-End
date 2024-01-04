const { User } = require('../../models/user');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const crypto = require('crypto');
const { Group } = require('../../models/group');
const { GROUP_FIELDS } = require('../../models/group/constatns');
const { Lab } = require('../../models/lab');
const { MESSAGES } = require('./constants');

//create group
const createGroup = async (req, res) => {
    if (!req.body.Users || req.body.Users.length < 2) return res.status(400).send(MESSAGES.USERS_NOT_PROVIDED)
    const lab = await Lab.findOne({
        _id: req.body.Lab,
        $or: [
            { Students: { $in: [req.user._id] } },
            { Supervisor: req.user._id }
        ]
    })
    if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)

    const group = new Group(_.pick(req.body, GROUP_FIELDS.CREATE))

    await group.save()

    res.send(group)
}

//delete group
const deleteGroup = async (req, res) => {
    const group = await Group.findOne({
        _id: req.body.Group
    })
    if (!group) return res.status(400).send(MESSAGES.GROUP_NOT_EXISTS)

    const lab = await Lab.findOne({
        _id: group.Lab,
        $or: [
            { Students: { $in: [req.user._id] } },
            { Supervisor: req.user._id }
        ]
    })
    if (!lab) return res.status(400).send(MESSAGES.NO_PERMISSION)

    group.isActive = false
    await group.save()

    res.send(MESSAGES.DELETED_SUCCESSFULLY)
}

//get groups
const getGroups = async (req, res) => {
    const groups = await Group.find({
        Lab: req.params.lab,
        isActive: true,
    }).populate(GROUP_FIELDS.POPULATE)

    res.send(groups)
}

//update a group
const updateGroup = async (req, res) => {
    const group = await Group.findOne({
        _id: req.body.Group
    })
    if (!group) return res.status(400).send(MESSAGES.GROUP_NOT_EXISTS)

    const lab = await Lab.findOne({
        _id: group.Lab,
        $or: [
            { Students: { $in: [req.user._id] } },
            { Supervisor: req.user._id }
        ]
    })
    if (!lab) return res.status(400).send(MESSAGES.NO_PERMISSION)

    if (req.body.group) {
        group.Users = group.Users.filter((user) => {
            return !user._id.equals(req.body.User)
        })
    }
    if (req.body.name) group.name = req.body.name

    await group.save()

    await group.populate(GROUP_FIELDS.POPULATE)
    
    res.send(group)
}

module.exports = {
    createGroup,
    getGroups,
    deleteGroup,
    updateGroup,
}