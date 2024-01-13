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
const MAIL_MAN = require('../../utils/mailMan/mailMan')();

//do a upload task
const doUploadTask = async (req, res) => {
    const userTask = await UserTask.findById(req.body.UserTask)
    if (!userTask) res.status(400).send(MESSAGES.USER_TASK_NOT_FOUND)


    const file = req.file
    if (!file) return res.status(400).json({ error: MESSAGES.NO_FILE });
    if (!ALLOWED_FORMATS.includes(file.mimetype)) return res.status(400).json({ error: MESSAGES.BAD_FORMAT });

    const fileName = file.originalname
    const fileFormat = fileName.split('.').pop()
    const fileAlias = crypto.randomBytes(6).toString('hex')

    const upload_res = await UPLOAD(file, fileAlias + '.' + fileFormat, 'reports', false)
    if (!upload_res) return res.status(500).json({ error: MESSAGES.UPLOAD_FAILED });

    const newFile = new File(_.pick(req.body, FILES_FIELD))

    newFile.name = req.body.name ?? fileName
    newFile.url = UPLOAD_BASE + 'reports/' + fileAlias + '.' + fileFormat
    newFile.alias = fileAlias
    newFile.size = file.size
    newFile.format = fileFormat
    newFile.type = 'report'

    await newFile.save()

    userTask.status(true)
    userTask.doneDate(Date.now())
    userTask.File = newFile._id

    await userTask.save()
}


module.exports = {
    doUploadTask,
}