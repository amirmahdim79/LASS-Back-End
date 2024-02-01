const { User } = require('../../models/user');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const crypto = require('crypto');
const { PATH_FIELDS, MESSAGES } = require('./constants');
const { Lab } = require('../../models/lab');
const { Supervisor } = require('../../models/supervisor');
const { Path } = require('../../models/path');
const { Milestone } = require('../../models/milestone');
const { MILESTONES_FIELD } = require('../milestones/constants');
const { Task } = require('../../models/task');
const { TASK_FIELDS } = require('../tasks/constants');

//post create path for lab(Sups)
const postCreatePath = async (req, res) => {
    const lab = await Lab.findOne({
        Supervisor: req.user._id
    })
    if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)

    const path = new Path(_.pick(req.body, PATH_FIELDS.CREATE))
    path.Lab = lab

    path.url = crypto.randomBytes(3).toString('hex')

    await path.save()

    lab.Paths.push(path._id)

    lab.save()

    res.send(_.pick(path, PATH_FIELDS.CREATE_RES))
}

//post create full path
const postCreateFullPath = async (req, res) => {
    const lab = await Lab.findOne({
        Supervisor: req.user._id
    })
    if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)

    let Milestones = req.body.Milestones

    const path = new Path(_.pick(req.body, PATH_FIELDS.CREATE))
    path.Lab = lab

    path.url = crypto.randomBytes(3).toString('hex')

    Milestones = Milestones.map((milestone) => {
        const newMilestone = new Milestone({
            ..._.pick(milestone, MILESTONES_FIELD.CREATE),
            Path: path._id,
        })

        let Tasks = milestone.Tasks.map((task) => {
            const newTask = new Task({
                ..._.pick(task, TASK_FIELDS.CREATE),
                Milestone: milestone._id,
            })
    
            return newTask
        })
        Task.insertMany(Tasks)

        Tasks.forEach((t) => {
            newMilestone.Tasks.push(t._id)
        })

        return newMilestone
    })
    await Milestone.insertMany(Milestones)

    Milestones.forEach((m) => {
        path.Milestones.push(m._id)
    })

    await path.save()

    lab.Paths.push(path._id)

    lab.save()

    res.send(_.pick(path, PATH_FIELDS.CREATE_RES))
}

module.exports = {
    postCreatePath,
    postCreateFullPath,
}