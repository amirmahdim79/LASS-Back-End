const { User } = require('../../models/user');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const crypto = require('crypto');
const { LABS_FIELD, MESSAGES } = require('./constants');
const { Lab } = require('../../models/lab');
const { Supervisor } = require('../../models/supervisor');
const { Milestone } = require('../../models/milestone');
const { Task } = require('../../models/task');

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
    } else {
        lab = await Lab.findOne({
            Students: {
                $elemMatch: {
                    $eq: req.user._id
                }
            }
        })
        .populate(LABS_FIELD.POPULATE)

        const user = await User.findOne({ _id: req.user._id })

        const userPath = lab.Paths.find((p) => 
            p.typeDependency.includes(user.type)
        )

        console.log(userPath)
        console.log(user.type)
        console.log(lab.Paths)

        lab.Paths = [userPath]
    }
    if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)

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