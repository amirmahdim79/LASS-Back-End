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
const { default: mongoose } = require('mongoose');

//post create cup for user(Admin)
const postCreateLab = async (req, res) => {
    const sups = await Supervisor.findOne({email: req.body.email})
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
        if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)
    } else {
        lab = await Lab.findOne({
            Students: {
                $elemMatch: {
                    $eq: req.user._id
                }
            }
        })
        .populate(LABS_FIELD.POPULATE)
        if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)

        const user = await User.findOne({ _id: req.user._id })

        const userPath = lab.Paths.find((p) => 
            p.typeDependency.includes(user.type)
        )

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

        console.log(userPath.Milestones[0])

        lab.Paths = [userPath]
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

    lab.Students.push(student)
    student.Labs.push(lab)

    lab.save()
    student.save()

    res.send('student successfully added to lab')
}

module.exports = {
    postCreateLab,
    getLabs,
    getLabByField,
    getMyLab_sups,
    enrollStudent,
}