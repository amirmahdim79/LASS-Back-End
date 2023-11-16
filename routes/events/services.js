const { User } = require('../../models/user');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const crypto = require('crypto');
const { PATH_FIELDS, MESSAGES } = require('./constants');
const { Lab } = require('../../models/lab');
const { Supervisor } = require('../../models/supervisor');
const { Path } = require('../../models/path');
const { Milestone } = require('../../models/milestone');
const { EVENT_FIELDS } = require('../../models/event/constants');
const { Event } = require('../../models/event');

//post create path for lab(Sups)
const postAddEvent = async (req, res) => {
    const lab = await Lab.findOne({
        _id: req.Lab
    })
    if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)

    let Initiator = await Supervisor.findById(req.user._id)
    if (!Initiator) {
        Initiator = await User.findById(req.user._id)
    }
    if (!Initiator) return res.status(400).send(MESSAGES.NO_INITIATOR)
    const initiatorType = Initiator.MODEL_TYPE

    const event = new Event(_.pick(req.body, EVENT_FIELDS.CREATE))
    event.Initiator = Initiator
    event.initiatorType = initiatorType
    event.Lab = Lab._id

    await event.save()

    res.send(_.pick(event, EVENT_FIELDS.INFO))
}

module.exports = {
    postAddEvent,
}