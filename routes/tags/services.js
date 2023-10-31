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

//seaarch tags
const searchTags = async (req, res) => {
    const milestone = await Milestone.findOne({ _id: req.body.Milestone })
    if (!milestone) return res.status(400).send(MESSAGES.MILESTONE_NOT_FOUND)

    const task = new Task(_.pick(req.body, TASK_FIELDS.CREATE))
    task.Milestone = milestone._id

    await task.save()

    milestone.Tasks.push(task._id)

    milestone.save()

    res.send(_.pick(task, TASK_FIELDS.CREATE_RES))
}

module.exports = {
    postCreateTask,
    completeTask,
    getTaskStatus,
}