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
const { MOMENT, generateWeeklyDates, generateMonthlyDates } = require('../../utils/dateHandler');
const { Forum } = require('../../models/forum');
const { PresenceForm } = require('../../models/presenceForm');

//post create path for lab(Sups)
const postAddEvent = async (req, res) => {
    const lab = await Lab.findOne({
        _id: req.body.Lab
    })
    if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)

    if (!req.body.start || !req.body.end) return res.status(400).send(MESSAGES.TIME_NOT_PROVIDED)

    // const overlap = await Event.find({
    //     $or: [
    //         { start: { $lt: req.body.end }, end: { $gt: req.body.start } }, // Event starts before 'end' and ends after 'start'
    //         { start: { $gte: req.body.start, $lt: req.body.end } },             // Event starts between 'start' and 'end'
    //         { end: { $gt: req.body.start, $lte: req.body.end } },               // Event ends between 'start' and 'end'
    //     ],
    // })
    // if (overlap.length > 0) return res.status(400).send(MESSAGES.EVENT_HAS_OVERLAP)

    let Initiator = await Supervisor.findById(req.user._id)
    if (!Initiator) {
        Initiator = await User.findById(req.user._id)
    }
    if (!Initiator) return res.status(400).send(MESSAGES.NO_INITIATOR)
    const initiatorType = Initiator.MODEL_TYPE

    const type = req.body.type
    const interval = req.body.interval
    const target = req.body.target ?? MOMENT(new Date()).endOf('year')
    let startDates = []
    let endDates = []
    if (type !== 'fixed') {
        if (interval === undefined || interval === null) return res.status(400).send(MESSAGES.NO_INTERVAL_PROVIDED)

        if (type === 'weekly') {
            if (interval > 6 || interval < 0) return res.status(400).send(MESSAGES.INVALID_INTERVAL)

            const weeklyStartDates = generateWeeklyDates(req.body.start, target, interval);
            const weeklyEndDates = generateWeeklyDates(req.body.end, target, interval);
            startDates = [...weeklyStartDates]
            endDates = [...weeklyEndDates]
        }
        if (type === 'monthly') {
            if (interval > 31 || interval < 1) return res.status(400).send(MESSAGES.INVALID_INTERVAL)

            const monthlyStartDates = generateMonthlyDates(req.body.start, target);
            const monthlyEndDates = generateMonthlyDates(req.body.end, target);
            startDates = [...monthlyStartDates]
            endDates = [...monthlyEndDates]
        }
    }

    if ((startDates.length === endDates.length) && (startDates.length > 0)) {
        const events = startDates.map((eventData, index) => {
            const event = new Event({
                ..._.pick(req.body, EVENT_FIELDS.CREATE),
                start: eventData.toDate(),
                end: endDates[index].toDate()
            });
            event.Initiator = Initiator._id;
            event.initiatorType = initiatorType;
            event.Lab = lab._id;
            return event;
        });

        const presenceForms = []

        const forums = startDates.map((eventData, index) => {
            const forum = new Forum({
                name: req.body.name,
                desc: req.body.desc,
                Users: req.body.Collaborators,
                Lab: lab._id,
                start: eventData.toDate(),
                Supervisor: lab.Supervisor,
            })

            const presenceForm = new PresenceForm({
                Forum: forum._id,
                list: presenceList,
            })
    
            forum.PresenceForm = presenceForm._id

            presenceForms.push(presenceForm)

            return forum
        })

        const savedEvents = await Event.insertMany(events);
        const populatedEvents = await Event.populate(savedEvents, EVENT_FIELDS.POPULATE);

        const savedForums = await Forum.insertMany(forums)
        await PresenceForm.insertMany(presenceForms)

        res.send(populatedEvents)
    } else {
        const event = new Event(_.pick(req.body, EVENT_FIELDS.CREATE))
        event.Initiator = Initiator
        event.initiatorType = initiatorType
        event.Lab = lab._id
    
        await (await event.save()).populate(EVENT_FIELDS.POPULATE)

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
            presenceList[id] = { status: true }
        })

        const presenceForm = new PresenceForm({
            Forum: forum._id,
            list: presenceList,
        })

        forum.PresenceForm = presenceForm._id

        await forum.save()
        await presenceForm.save()

        res.send(_.omit(_.pick(event, EVENT_FIELDS.INFO), 'Initiator'))
    }
}

//get lab events
const getLabEvents = async (req, res) => {
    const date = req.query.date ?? Date()
    const startOfWeek = MOMENT(date).startOf('week')
    const endOfWeek = MOMENT(date).endOf('week')

    const dateFilter = req.query.all ? {} : {
        start: {
            $gte: startOfWeek,
            $lt: endOfWeek,
        },
    };

    const lab = await Lab.findOne({
        _id: req.params.id
    })
    if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)

    let GOT_ACCESS = false
    if ((lab.Supervisor.equals(req.user._id)) || (lab.Students.includes(req.user._id))) GOT_ACCESS = true
    if (!GOT_ACCESS) return res.status(400).send(MESSAGES.ACCESS_DENIED)

    const events = await Event.find({
        ...dateFilter,
        Lab: lab._id,
    }).populate(EVENT_FIELDS.POPULATE).select('-Initiator.password -Initiator.permissions')

    res.send(events)
}

module.exports = {
    postAddEvent,
    getLabEvents,
}