const { User } = require('../../models/user');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const crypto = require('crypto');
const { Group } = require('../../models/group');
const { GROUP_FIELDS } = require('../../models/group/constatns');
const { Lab } = require('../../models/lab');
const { MESSAGES } = require('./constants');
const { Forum } = require('../../models/forum');
const { Message } = require('../../models/message');
const { FORUM_FIELDS } = require('../../models/forum/constatns');
const { MESSAGE_FIELDS } = require('../../models/message/constatns');
const { MODELS } = require('../../constant/models');
const { Supervisor } = require('../../models/supervisor');

//get Lab forums (sups)
const getLabForums = async (req, res) => {
    const lab = await Lab.findOne({
        _id: req.params.lab,
        $or: [
            { Students: { $in: [req.user._id] } },
            { Supervisor: req.user._id }
        ]
    })
    if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)

    const forums = await Forum.find({
        Lab: req.params.lab,
        isActive: true,
    }).populate(FORUM_FIELDS.POPULATE)

    res.send(forums)
}

//get Lab forums for a user
const getForums = async (req, res) => {
    const lab = await Lab.findOne({
        _id: req.params.lab,
        $or: [
            { Students: { $in: [req.user._id] } },
            { Supervisor: req.user._id }
        ]
    })
    if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)

    const forums = await Forum.find({
        Lab: req.params.lab,
        isActive: true,
        Collaborators: { $in: [req.user._id] }
    }).populate(FORUM_FIELDS.POPULATE)

    res.send(forums)
}

//send message to a forum
const sendMessage = async (req, res) => {
    const senderType = req.body.senderType

    const user = senderType === MODELS.USER ? await User.findById(req.user._id) : await Supervisor.findById(req.user._id)
    const IS_SUPS = user.MODEL_TYPE === MODELS.SUPERVISOR

    const text = req.body.text
    if (!text) return res.status(400).send(MESSAGES.TEXT_NOT_PROVIDED)

    const forum = await Forum.findById(req.body.Forum)
    if (!forum) return res.status(400).send(MESSAGES.FORUM_NOT_FOUND)

    //TODO: there is a loop whole here, if the api gets called when the user has the permission but is not from this lab or forum!
    const forumPermission = IS_SUPS || user.permissions.includes('forums') || forum.Users.includes(user._id)
    if (!forumPermission) return res.status(400).send(MESSAGES.NO_PERMISSION)

    if (IS_SUPS && !forum.Supervisor.equals(user._id)) return res.status(400).send(MESSAGES.NO_PERMISSION)

    const newMessage = new Message(
        _.pick(req.body, MESSAGE_FIELDS.CREATE)
    )
    newMessage.Sender = user._id

    await newMessage.save()
    
    forum.Messages.push(newMessage._id)

    await forum.save()

    await forum.populate(FORUM_FIELDS.POPULATE)

    res.send(forum)
}

//get a forum
const getForum = async (req, res) => {
    const userType = req.query.type
    const IS_SUPS = userType === MODELS.SUPERVISOR

    const user = IS_SUPS ? await Supervisor.findById(req.user._id) : await User.findById(req.user._id)

    const forum = await Forum.findById(req.params.forum)
    if (!forum) return res.status(400).send(MESSAGES.FORUM_NOT_FOUND)

    const forumPermission = (IS_SUPS && forum.Supervisor.equals(user._id)) || user.permissions.includes('forums') || forum.Users.includes(user._id)

    if (!forumPermission) return res.status(400).send(MESSAGES.NO_PERMISSION)

    await forum.populate(FORUM_FIELDS.POPULATE)

    res.send(forum)
}

module.exports = {
    getLabForums,
    getForums,
    sendMessage,
    getForum,
}