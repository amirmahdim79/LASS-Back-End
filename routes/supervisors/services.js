const { MODELS } = require('../../constant/models');
const { MESSAGES, SUPS_FIELDS } = require('./constants')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const config = require('config')
const nodemailer = require('nodemailer');
const { checkEmailFormat } = require('../../utils/emailRegexChecker');
const { generateRandNum } = require('../../utils/randomNumberGen');
const crypto = require('crypto');
const { validateSupervisor, Supervisor } = require('../../models/supervisor');
const { File } = require('../../models/file');

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

    if (supervisor.RecentFiles.includes(file._id)) return res.status(400).send(MESSAGES.FILE_ALREADY_ADDED)

    supervisor.RecentFiles.push(file._id)
    await supervisor.save()

    await supervisor.populate('RecentFiles')

    res.send(supervisor.RecentFiles.filter(file => {
        return file.isActive
    }))
}

module.exports = {
    postCreateSupervisor,
    addRecentFile,
}