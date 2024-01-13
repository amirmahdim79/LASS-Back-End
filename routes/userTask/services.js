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
const MAIL_MAN = require('../../utils/mailMan/mailMan')();

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


module.exports = {
    getLabForums,
}