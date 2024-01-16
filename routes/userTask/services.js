const { User } = require('../../models/user');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const crypto = require('crypto');
const { Group } = require('../../models/group');
const { File } = require('../../models/file');
const { GROUP_FIELDS } = require('../../models/group/constatns');
const { Lab } = require('../../models/lab');
const { MESSAGES, ALLOWED_FORMATS } = require('./constants');
const { Forum } = require('../../models/forum');
const { Message } = require('../../models/message');
const { FORUM_FIELDS } = require('../../models/forum/constatns');
const { MESSAGE_FIELDS } = require('../../models/message/constatns');
const { MODELS } = require('../../constant/models');
const { Supervisor } = require('../../models/supervisor');
const { UserTask } = require('../../models/userTask');
const { UPLOAD, UPLOAD_BASE } = require('../../utils/fileUpload');
const { USER_TASK_FIELDS } = require('../../models/userTask/constatns');
const { FILES_FIELD } = require('../../models/file/constant');
const MAIL_MAN = require('../../utils/mailMan/mailMan')();

//do a upload task
const doUploadTask = async (req, res) => {
    const userTask = await UserTask.findOne({
        _id: req.body.UserTask,
        User: req.user._id,
    })
    if (!userTask) res.status(400).send(MESSAGES.USER_TASK_NOT_FOUND)


    const file = req.file
    if (!file) return res.status(400).json({ error: MESSAGES.NO_FILE });
    if (!ALLOWED_FORMATS.includes(file.mimetype)) return res.status(400).json({ error: MESSAGES.BAD_FORMAT });

    const fileName = file.originalname
    const fileFormat = fileName.split('.').pop()
    const fileAlias = crypto.randomBytes(6).toString('hex')

    const upload_res = await UPLOAD(file, fileAlias + '.' + fileFormat, 'reports')
    if (!upload_res) return res.status(500).json({ error: MESSAGES.UPLOAD_FAILED });

    const newFile = new File(_.pick(req.body, FILES_FIELD.CREATE))

    newFile.name = req.body.name ?? fileName
    newFile.url = UPLOAD_BASE + 'reports/' + fileAlias + '.' + fileFormat
    newFile.alias = fileAlias
    newFile.size = file.size
    newFile.format = fileFormat
    newFile.type = 'report'

    await newFile.save()

    userTask.status = true
    userTask.doneDate = Date.now()
    userTask.File = newFile._id

    await userTask.save()

    const user = await User.findById(req.user._id)
    user.smarties += userTask.smarties
    await user.save()

    res.send(_.pick(userTask, USER_TASK_FIELDS.INFO))
}

//do paper task
const doPaperTask = async (req, res) => {
    const userTask = await UserTask.findOne({
        _id: req.body.UserTask,
        User: req.user._id,
    })
    if (!userTask) res.status(400).send(MESSAGES.USER_TASK_NOT_FOUND)

    userTask.status = true
    userTask.doneDate = Date.now()
    await userTask.save()

    const user = await User.findById(req.user._id)
    user.smarties += userTask.smarties
    await user.save()

    res.send(_.pick(userTask, USER_TASK_FIELDS.INFO))
}

//get user tasks
const getUserTasks = async (req, res) => {
    const userTasks = await UserTask.find({
        User: req.user._id,
    })

    res.send(userTasks)
}

//get user task
const getUserTask = async (req, res) => {
    const userTask = await UserTask.findOne({
        User: req.user._id,
        _id: req.params.id,
    })
    if (!userTask) res.status(400).send(MESSAGES.USER_TASK_NOT_FOUND)

    res.send(userTask)
}



module.exports = {
    doUploadTask,
    doPaperTask,
    getUserTasks,
    getUserTask,
}