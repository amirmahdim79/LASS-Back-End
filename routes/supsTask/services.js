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
const { SupsTask } = require('../../models/supsTask');
const { SUPS_TASK_FIELDS } = require('../../models/supsTask/constatns');
const MAIL_MAN = require('../../utils/mailMan/mailMan')();

//get sups tasks
const getSupsTasks = async (req, res) => {
    const supsTasks = await SupsTask.find({
        Supervisor: req.user._id,
    }).populate(SUPS_TASK_FIELDS.POPULATE)

    res.send(supsTasks)
}

//get sups task
const getSupsTask = async (req, res) => {
    const supsTask = await SupsTask.findOne({
        Supervisor: req.user._id,
        _id: req.params.id,
    }).populate(SUPS_TASK_FIELDS.POPULATE)
    if (!supsTask) res.status(400).send(MESSAGES.USER_TASK_NOT_FOUND)

    res.send(supsTask)
}

module.exports = {
    getSupsTasks,
    getSupsTask,
}