const { User } = require('../../models/user');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const crypto = require('crypto');
const { LABS_FIELD, MESSAGES } = require('./constants');
const { Lab } = require('../../models/lab');
const { Supervisor } = require('../../models/supervisor');
const { Milestone } = require('../../models/milestone');
const { Task } = require('../../models/task');
const { TaskStatus } = require('../../models/taskStatus');
const { MilestoneStatus } = require('../../models/milestoneStatus');
const { Event } = require('../../models/event');
const { default: mongoose } = require('mongoose');
const { Enrollment } = require('../../models/enrollment');
const MAIL_MAN = require('../../utils/mailMan/mailMan')();
const { EMAIL_TEMPLATE_NAMES } = require('../../utils/mailMan/constants');
const { USER_FIELDS } = require('../users/constants');
const { Constant } = require('../../models/constant');
const { UserTask } = require('../../models/userTask');

//post create cup for user(Admin)
const postCreateLab = async (req, res) => {
    const sups = await Supervisor.findOne({ _id: req.user._id })
    if (!sups) return res.status(400).send(MESSAGES.USER_NOT_FOUND)

    const lab = new Lab(_.pick(req.body, LABS_FIELD.CREATE))

    lab.Supervisor = sups._id
    lab.url = crypto.randomBytes(3).toString('hex')
    await lab.save()

    res.send(_.pick(lab, LABS_FIELD.CREATE_RES))
}

//get all labs
const getLabs = async (req, res) => {
    const labs = await Lab.find()
    .populate(LABS_FIELD.POPULATE)

    res.send(labs)
}

//get lab by Id or url
const getLabByField = async (req, res) => {
    const lab = await Lab.findOne({
        $or: [
            { _id: req.params.id }, // Match by id
            { url: req.params.id }  // Match by URL
        ]
    })
    .populate(LABS_FIELD.POPULATE)

    res.send(lab)
}

//get my lab
const getMyLab_sups = async (req, res) => {
    let lab
    if (req.query.sups) {
        lab = await Lab.findOne({
            Supervisor: req.user._id
        })
        .populate(LABS_FIELD.POPULATE)
        if (!lab) return res.send(null)
    } else {
        lab = await Lab.findOne({
            Students: {
                $elemMatch: {
                    $eq: req.user._id
                }
            }
        })
        .populate(LABS_FIELD.POPULATE)
        if (!lab) return res.send(null)

        const user = await User.findOne({ _id: req.user._id })

        const userPath = lab.Paths.find((p) => 
            p.typeDependency.includes(user.type)
        )

        if (userPath && userPath.Milestones) {
            userPath.Milestones = userPath.Milestones.map((m) => {
                const userMilesstoneStatus = m.status.find((s) => {
                    return s.User.equals(mongoose.Types.ObjectId(user._id))
                })
    
                m.status = [userMilesstoneStatus]
    
                m.Tasks = m.Tasks.map((t) => {
                    const userTaskStatus = t.status.find((s) => {
                        return s.User.equals(mongoose.Types.ObjectId(user._id))
                    })
    
                    t.status = [userTaskStatus]
    
                    return t
                })
    
                return m
            })
        }

        lab.Paths = userPath ? [userPath] : []
    }

    res.send(lab)
}

//enroll new student
const enrollStudent = async (req, res) => {
    const lab = await Lab.findOne({
        Supervisor: req.user._id
    })
    .populate(LABS_FIELD.POPULATE)
    if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)

    const student = await User.findOne({ email: req.body.email })
    if (!student) return res.status(400).send(MESSAGES.STUDENT_NOT_FOUND)

    // TODO: for the sake of development, we only get the sign from superviosr now
    const existing = await Enrollment.findOne({
        Lab: lab._id,
        Student: student._id,
    })
    if (existing) return res.status(400).send(MESSAGES.USER_ALREADY_ENROLLED)

    const enrollment = new Enrollment({
        Lab: lab._id,
        Student: student._id,
        supervisorSign: true,
        studentSign: true,
        enrolled: true,
        enrolledDate: Date.now()
    })

    await enrollment.save()

    lab.Students.push(student)
    student.Labs.push(lab)

    lab.save()
    student.save()

    MAIL_MAN.SEND_TEMPLATE(student.email, EMAIL_TEMPLATE_NAMES.LAB_WELCOME, {
        name: student.firstName,
        lab_name: lab.name,
    })

    res.send(lab.Students)
}

//get lab users
const getAllUsers = async (req, res) => {
    const lab = await Lab.findOne({
        Supervisor: req.user._id
    })
    .populate({
        path: 'Students',
        select: '-password',
    })
    if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)

    res.send(lab.Students)
}

//get lab users
const getAlumni = async (req, res) => {
    const lab = await Lab.findOne({
        Supervisor: req.user._id
    })
    .populate({
        path: 'Alumni',
        select: '-password',
    })
    if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)

    res.send(lab.Alumni)
}

//remove a user from lab
const removeUser = async (req, res) => {
    const student = await User.findOne({
        email: req.body.email
    })
    if (!student) res.status(404).send(MESSAGES.USER_NOT_FOUND)

    res.send('API NOT YET COMPLETE')
}

//get a users info
const getUserInfo = async (req, res) => {
    const student = await User.findOne({
        _id: req.query.id,
        isActive: true,
    })

    const lab = await Lab.findOne({
        _id: req.query.lab
    }).populate(LABS_FIELD.POPULATE)

    const userPath = lab.Paths.find((p) => 
        p.typeDependency.includes(student.type)
    )

    userPath.Milestones = userPath.Milestones.map((m) => {
        const userMilesstoneStatus = m.status.find((s) => {
            return s.User.equals(mongoose.Types.ObjectId(student._id))
        })

        m.status = [userMilesstoneStatus]

        m.Tasks = m.Tasks.map((t) => {
            const userTaskStatus = t.status.find((s) => {
                return s.User.equals(mongoose.Types.ObjectId(student._id))
            })

            t.status = [userTaskStatus]

            return t
        })

        return m
    })

    res.send({
        ..._.pick(student, USER_FIELDS.INFO),
        path: [userPath],
    })
}

//get permissions
const getPermissions = async (req, res) => {
    const withDesc = req.query.withDesc

    const permissions = await Constant.findOne({
        key: withDesc ? "PERMISSIONS_WITH_DESC" : "PERMISSIONS",
    })

    res.send(permissions)
}

//get leaderboard
const getLeaderboard = async (req, res) => {
    const lab = await Lab.findOne({
        _id: req.query.lab
    }).populate(LABS_FIELD.POPULATE)
    if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)

    let leaderboard = lab.Students
    leaderboard.sort((a, b) => b.smarties - a.smarties)

    res.send(leaderboard)
}

//get lab users info
const getLabUsersInfo = async (req, res) => {
    const lab = await Lab.findOne({
        _id: req.query.lab
    })
    .populate({
        path: 'Students',
        select: '-password',
    })
    if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)

    const users = lab.Students
    const result = await Promise.all(users.map(async user => {
        const tasks = await UserTask.find({
            User: user._id,
            Lab: lab._id
        }).sort({ dueDate: 1 })
        return {
            ..._.pick(user, USER_FIELDS.INFO),
            Tasks: tasks,
        }
    }))

    res.send(result)
}

module.exports = {
    postCreateLab,
    getLabs,
    getLabByField,
    getMyLab_sups,
    enrollStudent,
    getAllUsers,
    removeUser,
    getUserInfo,
    getPermissions,
    getLeaderboard,
    getLabUsersInfo,
    getAlumni,
}