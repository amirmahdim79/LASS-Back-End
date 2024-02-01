const { User } = require('../../models/user');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const crypto = require('crypto');
const { TASK_FIELDS, MESSAGES } = require('./constants');
const { Lab } = require('../../models/lab');
const { Supervisor } = require('../../models/supervisor');
const { Path } = require('../../models/path');
const { File } = require('../../models/file');
const { Milestone } = require('../../models/milestone');
const { Task } = require('../../models/task');
const { TaskStatus } = require('../../models/taskStatus');
const { TASK_STATUS_FIELDS } = require('../../models/taskStatus/constants');
const { ALLOWED_FORMATS } = require('../files/constants');
const { UPLOAD, UPLOAD_BASE } = require('../../utils/fileUpload');
const { FILES_FIELD } = require('../../models/file/constant');

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

        task.status.push(taskStatus._id)
    }

    taskStatus.status = true
    taskStatus.doneDate = Date.now()
    await taskStatus.save()

    await task.save()

    res.send(_.pick(taskStatus, TASK_STATUS_FIELDS.INFO))
}

//get task status
const getTaskStatus = async (req, res) => {
    const status = await TaskStatus.findOne({ _id: req.query.id })
    if (!status) return res.status(400).send(MESSAGES.STATUS_NOT_FOUND)

    res.send(status)
}

//do a paper task
const postDoPaperTask = async (req, res) => {
    const task = await Task.findOne({ _id: req.body.Task })
    if (!task) return res.status(400).send(MESSAGES.TASK_NOT_FOUND)

    let taskStatus = await TaskStatus.findOne({ Task: task.id, User: req.user._id })
    if (!taskStatus) {
        taskStatus = new TaskStatus({
            Task: task.id,
            User: req.user._id,
        })

        task.status.push(taskStatus._id)
    }

    taskStatus.status = true
    taskStatus.doneDate = Date.now()
    await taskStatus.save()

    await task.save()

    const user = await User.findById(req.user._id)
    user.sand += task.sandGain
    await user.save()

    res.send({
        Task: _.pick(task, TASK_FIELDS.INFO),
        taskStatus: _.pick(taskStatus, TASK_STATUS_FIELDS.INFO)
    })
}

//do an upload task
const postUploadTask = async (req, res) => {
    const task = await Task.findOne({ _id: req.body.Task })
    if (!task) return res.status(400).send(MESSAGES.TASK_NOT_FOUND)

    let taskStatus = await TaskStatus.findOne({ Task: task.id, User: req.user._id })
    if (!taskStatus) {
        taskStatus = new TaskStatus({
            Task: task.id,
            User: req.user._id,
        })

        task.status.push(taskStatus._id)
    }

    const file = req.file
    if (!file) return res.status(400).json({ error: MESSAGES.NO_FILE });
    if (!ALLOWED_FORMATS.includes(file.mimetype)) return res.status(400).json({ error: MESSAGES.BAD_FORMAT });

    const fileName = file.originalname
    const fileFormat = fileName.split('.').pop()
    const fileAlias = crypto.randomBytes(6).toString('hex')

    const upload_res = await UPLOAD(file, fileAlias + '.' + fileFormat, 'milestone_tasks')
    if (!upload_res) return res.status(500).json({ error: MESSAGES.UPLOAD_FAILED });

    const newFile = new File(_.pick(req.body, FILES_FIELD.CREATE))

    newFile.name = req.body.name ?? fileName
    newFile.url = UPLOAD_BASE + 'milestone_tasks/' + fileAlias + '.' + fileFormat
    newFile.alias = fileAlias
    newFile.size = file.size
    newFile.format = fileFormat
    newFile.type = 'milestone_tasks'

    await newFile.save()

    taskStatus.status = true
    taskStatus.doneDate = Date.now()
    taskStatus.File = newFile._id

    await taskStatus.save()

    const user = await User.findById(req.user._id)
    user.sand += task.sandGain
    await user.save()

    res.send({
        Task: _.pick(task, TASK_FIELDS.INFO),
        taskStatus: _.pick(taskStatus, TASK_STATUS_FIELDS.INFO)
    })
}

//get a task
const getTask = async (req, res) => {
    const task = await Task.findOne({ _id: req.query.id })
    if (!task) return res.status(400).send(MESSAGES.TASK_NOT_FOUND)

    let taskStatus = await TaskStatus.findOne({ Task: task.id, User: req.user._id })
    if (!taskStatus) {
        taskStatus = new TaskStatus({
            Task: task.id,
            User: req.user._id,
        })

        task.status.push(taskStatus._id)

        await taskStatus.save()
        await task.save()
    }

    res.send({
        Task: _.pick(task, TASK_FIELDS.INFO),
        taskStatus: _.pick(taskStatus, TASK_STATUS_FIELDS.INFO)
    })
}

module.exports = {
    postCreateTask,
    completeTask,
    getTaskStatus,
    postDoPaperTask,
    getTask,
    postUploadTask,
}