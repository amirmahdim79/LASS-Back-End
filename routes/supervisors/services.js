const { MODELS } = require('../../constant/models');
const { MESSAGES, SUPS_FIELDS, ALLOWED_FORMATS } = require('./constants')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const config = require('config')
const nodemailer = require('nodemailer');
const { checkEmailFormat } = require('../../utils/emailRegexChecker');
const { generateRandNum } = require('../../utils/randomNumberGen');
const crypto = require('crypto');
const { validateSupervisor, Supervisor } = require('../../models/supervisor');
const { File } = require('../../models/file');
const { UPLOAD, UPLOAD_BASE } = require('../../utils/fileUpload');
const { User } = require('../../models/user');
const { USER_FIELDS } = require('../users/constants');
const { ACTIVITIES } = require('../../constant/activities');
const { CREATE_NEW_ACTIVITY } = require('../../utils/activityHandler');

// const transporter = nodemailer.createTransport({
//     service: config.get('email_service'),
//     auth: {
//         user: config.get('email_address'),
//         pass: config.get('email_password')
//     }
// })

const postCreateSupervisor = async (req, res) => {
    const { error } = validateSupervisor(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let sups = await Supervisor.findOne({email: req.body.email})
    if (sups) return res.status(400).send(MESSAGES.ALREADY_REGISTERED)

    sups = new Supervisor(_.pick(req.body, SUPS_FIELDS.SIGNUP))
    const salt = await bcrypt.genSalt(10)
    sups.password = await bcrypt.hash(sups.password, salt)

    sups.url = crypto.randomBytes(3).toString('hex')
    await sups.save()

    const token = sups.generateAuthToken()
    res.header('x-auth-token', token).send(_.pick(sups, SUPS_FIELDS.INFO))
}

//add to sups recent files
const addRecentFile = async (req, res) => {
    const supervisor = await Supervisor.findOne({_id: req.user._id})
    if (!supervisor) return res.status(400).send(MESSAGES.USER_NOT_FOUND)

    const file = await File.findOne({_id: req.body.File, isActive: true})
    if (!file) return res.status(400).send(MESSAGES.FILE_NOT_FOUND)

    const newRecentFiles = supervisor.RecentFiles.filter(recent => {
        return !recent.equals(file._id)
    })
    newRecentFiles.push(file._id)

    supervisor.RecentFiles = [...newRecentFiles].slice(-10)

    await supervisor.save()

    await supervisor.populate('RecentFiles')

    CREATE_NEW_ACTIVITY(
        req.user._id,
        ACTIVITIES.DOWNLOAD_PAPER.KEY,
        ACTIVITIES.DOWNLOAD_PAPER.TEXT,
    )

    res.send(supervisor.RecentFiles.filter(file => {
        return file.isActive
    }))
}

//update profile picture
const uploadProfilePicture = async (req, res) => {
    const sup = await Supervisor.findOne({_id: req.user._id})
    if (!sup) return res.status(400).send(MESSAGES.USER_NOT_FOUND)

    const file = req.file
    if (!file) return res.status(400).json({ error: MESSAGES.NO_FILE });
    if (!ALLOWED_FORMATS.includes(file.mimetype)) return res.status(400).json({ error: MESSAGES.BAD_FORMAT });

    const fileName = file.originalname
    const fileFormat = fileName.split('.').pop()
    const fileAlias = crypto.randomBytes(6).toString('hex')

    const upload_res = await UPLOAD(file, fileAlias + '.' + fileFormat, 'profiles')
    if (!upload_res) return res.status(500).json({ error: MESSAGES.UPLOAD_FAILED });

    const url = UPLOAD_BASE + 'profiles/' + fileAlias + '.' + fileFormat

    sup.profilePicture = url
    await sup.save()

    res.send(_.pick(sup, SUPS_FIELDS.INFO))
}

//give permission to a user
const givePermission = async (req, res) => {
    const student = await User.findOne({
        email: req.body.email,
    })
    if (!student) return res.status(404).send(MESSAGES.USER_NOT_FOUND)

    const filterList = []

    const newPermissions = req.body.permissions
    if (!newPermissions) return res.status(404).send(MESSAGES.NO_PERMISSION_GIVEN)

    Object.keys(newPermissions).forEach(key => {
        const permission = key
        const value = newPermissions[permission]

        if (value) {
            if (!student.permissions.includes(permission)) {
                student.permissions.push(permission)
            }
        } else {
            filterList.push(permission)
        }
    });

    student.permissions = student.permissions.filter((p) => {
        return !filterList.includes(p)
    })

    await student.save()

    res.send(MESSAGES.PERMISSION_ADDED)
}

//add sand to a user
const addSand = async (req, res) => {
    const student = await User.findOne({
        email: req.body.email,
    })
    if (!student) return res.status(404).send(MESSAGES.USER_NOT_FOUND)

    const sandToAdd = req.body.sand
    if (!sandToAdd || typeof sandToAdd !== 'number') return res.status(400).send(MESSAGES.PROVIDE_SAND_VALUE)

    student.sand += sandToAdd
    await student.save()

    res.send(_.pick(student, USER_FIELDS.INFO))
}

//add sand to a user
const addSmarties = async (req, res) => {
    const student = await User.findOne({
        email: req.body.email,
    })
    if (!student) return res.status(404).send(MESSAGES.USER_NOT_FOUND)

    const smartiesAmount = req.body.smarties
    if (!smartiesAmount || typeof smartiesAmount !== 'number' || smartiesAmount < 1) return res.status(400).send(MESSAGES.PROVIDE_SMARTIES_VALUE)

    student.smarties += smartiesAmount
    await student.save()

    res.send(_.pick(student, USER_FIELDS.INFO))
}

module.exports = {
    postCreateSupervisor,
    addRecentFile,
    uploadProfilePicture,
    givePermission,
    addSand,
    addSmarties,
}