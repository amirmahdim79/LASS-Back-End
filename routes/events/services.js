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
        _id: req.body.Lab
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
    event.Lab = lab._id

    await (await event.save()).populate(EVENT_FIELDS.POPULATE)

    res.send(_.omit(_.pick(event, EVENT_FIELDS.INFO), 'Initiator'))
}

//get lab events
const getLabEvents = async (req, res) => {
    const lab = await Lab.findOne({
        _id: req.body.Lab
    })
    if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)

    let GOT_ACCESS = false
    if ((lab.Supervisor.equals(req.user._id)) || (lab.Students.includes(req.user._id))) GOT_ACCESS = true
    if (!GOT_ACCESS) return res.status(400).send(MESSAGES.ACCESS_DENIED)

    const events = await Event.find({
        Lab: lab._id
    }).populate(EVENT_FIELDS.POPULATE).select('-Initiator.password -Initiator.roles')

    res.send(events)
}

module.exports = {
    postAddEvent,
    getLabEvents,
}