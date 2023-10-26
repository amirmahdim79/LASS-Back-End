const { User } = require('../../models/user');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const crypto = require('crypto');
const { TASK_FIELDS, MESSAGES } = require('./constants');
const { Lab } = require('../../models/lab');
const { Supervisor } = require('../../models/supervisor');
const { Path } = require('../../models/path');
const { Milestone } = require('../../models/milestone');
const { Task } = require('../../models/task');
const { TaskStatus } = require('../../models/taskStatus');
const { TASK_STATUS_FIELDS } = require('../../models/taskStatus/constants');

//post create task for a milestone(Sups)
const postCreateTask = async (req, res) => {
    const milestone = await Milestone.findOne({ _id: req.body.Milestone })
    if (!milestone) return res.status(400).send(MESSAGES.MILESTONE_NOT_FOUND)

    const task = new Task(_.pick(req.body, TASK_FIELDS.CREATE))
    task.Milestone = milestone._id

    await task.save()

    milestone.Tasks.push(task._id)

    milestone.save()

    res.send(_.pick(task, TASK_FIELDS.CREATE_RES))
}

//TODO: just development api
const completeTask = async (req, res) => {
    const task = await Task.findOne({ _id: req.body.Task })
    if (!task) return res.status(400).send(MESSAGES.TASK_NOT_FOUND)

    let taskStatus = await TaskStatus.findOne({ Task: task.id, User: req.user._id })
    if (!taskStatus) {
        taskStatus = new TaskStatus({
            Task: task.id,
            User: req.user._id,
        })

    }

    taskStatus.status = true
    taskStatus.doneDate = Date.now()
    await taskStatus.save()

    task.status.push(taskStatus._id)
    await task.save()

    res.send(_.pick(taskStatus, TASK_STATUS_FIELDS.INFO))
}

//get task status
const getTaskStatus = async (req, res) => {
    const status = await TaskStatus.findOne({ _id: req.query.id })
    if (!status) return res.status(400).send(MESSAGES.STATUS_NOT_FOUND)

    res.send(status)
}

module.exports = {
    postCreateTask,
    completeTask,
    getTaskStatus,
}