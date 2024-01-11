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

//get Lab forums (sups)
const updatePresence = async (req, res) => {
    const forum = await Forum.findOne({
        Lab: req.query.lab,
        _id: req.body.Forum,
        isActive: true,
    }).populate(FORUM_FIELDS.POPULATE)
    if (!forum) res.status(400).send(MESSAGES.FORUM_NOT_FOUND)

    const presenceForm = await PresenceForm.findOne({
        Forum: forum._id
    })
    if (!presenceForm) res.status(400).send(MESSAGES.PRESENCE_FORM_NOT_EXIST)

    presenceForm.list = req.body.list

    res.send(presenceForm)
}

module.exports = {
    updatePresence
}