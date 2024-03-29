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
const { Milestone } = require('../../models/milestone');
const { MilestoneStatus } = require('../../models/milestoneStatus');
const { CREATE_NEW_ACTIVITY } = require('../../utils/activityHandler');
const { ACTIVITIES } = require('../../constant/activities');
const MAIL_MAN = require('../../utils/mailMan/mailMan')();

//get sups tasks
const getSupsTasks = async (req, res) => {
    const supsTasks = await SupsTask.find({
        Supervisor: req.user._id,
        status: false,
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

//accept a milestone
const acceptMilestone = async (req, res) => {
    const supsTask = await SupsTask.findOne({
        _id: req.body.taskId,
        Supervisor: req.user._id
    })
    if (!supsTask) res.status(404).send(MESSAGES.TASK_NOT_FOUND)

    const milestone = await Milestone.findById(req.body.Milestone)
    if (!milestone) res.status(404).send(MESSAGES.MILESTONE_NOT_FOUND)

    const user = await User.findById(req.body.User)
    if (!user) res.status(404).send(MESSAGES.USER_NOT_FOUND)

    const lab = await Lab.findOne({
        Supervisor: req.user._id
    })

    let newMilestoneStatus = await MilestoneStatus.findOne({
        Milestone: milestone.id,
        User: user._id,
    })

    if (!newMilestoneStatus) {
        newMilestoneStatus = new MilestoneStatus({
            status: true,
            Milestone: milestone.id,
            User: user._id,
            doneDate: Date.now(),
        })

        milestone.status.push(newMilestoneStatus._id)
    }

    await newMilestoneStatus.save()

    await milestone.save()

    supsTask.status = true
    await supsTask.save()

    CREATE_NEW_ACTIVITY(
        user._id,
        lab._id,
        ACTIVITIES.COMPELETE_MILESTONE.KEY,
        ACTIVITIES.COMPELETE_MILESTONE.TEXT,
    )

    user.sand += milestone.sandGain
    await user.save()

    res.send("Milestone accepted.")
}

//reject a milestone
const rejectMilestone = async (req, res) => {
    
}

module.exports = {
    getSupsTasks,
    getSupsTask,
    acceptMilestone,
    rejectMilestone,
}