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
const { PresenceForm } = require('../../models/presenceForm');
const { CREATE_NEW_ACTIVITY } = require('../../utils/activityHandler');
const { ACTIVITIES } = require('../../constant/activities');
const MAIL_MAN = require('../../utils/mailMan/mailMan')();

function extractEmails(text, emails, matchEmail) {
    const regex = /\*([^*]+)\*/g;
    const matches = [];
    let match;
  
    while ((match = regex.exec(text)) !== null) {
        if (matches.includes(match[1])) continue
        if (emails.includes(match[1]) || match[1] === matchEmail) {
            matches.push(match[1])
        }
    }
  
    return matches;
}

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

    forum.MessagesStatus = {
        ...forum.MessagesStatus,
        [user._id]: {
            lastMessageSeen: newMessage._id
        }
    }

    await forum.save()
    await forum.populate(FORUM_FIELDS.POPULATE)

    const userEmailList = forum.Users.map((user) => user.email)
    const emails = extractEmails(text, userEmailList, forum.Supervisor.email)
    emails.forEach(email => {
        MAIL_MAN.SEND_TEMPLATE(email, 'FORUM_MENTION', {
            name: user.firstName + ' ' + user.lastName,
            text,
        })
    })

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

    forum.MessagesStatus = {
        ...forum.MessagesStatus,
        [user._id]: {
            lastMessageSeen: forum.Messages.slice(-1)[0]
        }
    }

    await forum.save()

    await forum.populate(FORUM_FIELDS.POPULATE)

    CREATE_NEW_ACTIVITY(
        req.user._id,
        ACTIVITIES.OPEN_FORUM.KEY,
        ACTIVITIES.OPEN_FORUM.TEXT,
    )

    res.send(forum)
}

//create new forum
const createForum = async (req, res) => {
    const lab = await Lab.findOne({
        _id: req.body.Lab
    })
    if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)

    const forum = new Forum({
        name: req.body.name,
        desc: req.body.desc,
        Users: req.body.Collaborators,
        Lab: lab._id,
        start: req.body.start,
        Supervisor: lab.Supervisor,
    })

    const presenceList = {}
    req.body.Collaborators.forEach(id => {
        presenceList[id] = { status: 'present' }
    })

    const presenceForm = new PresenceForm({
        Forum: forum._id,
        list: presenceList,
    })

    forum.PresenceForm = presenceForm._id

    await forum.save()
    await presenceForm.save()

    await forum.populate(FORUM_FIELDS.POPULATE)

    res.send(forum)
}

module.exports = {
    getLabForums,
    getForums,
    sendMessage,
    getForum,
    createForum,
}