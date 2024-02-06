const { MODELS } = require('../../constant/models');
const { User, validateUser, EmailAuthObject } = require('../../models/user');
const { File } = require('../../models/file');
const { MESSAGES, USER_FIELDS, ALLOWED_FORMATS } = require('./constants')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const config = require('config')
const nodemailer = require('nodemailer');
const { checkEmailFormat } = require('../../utils/emailRegexChecker');
const { generateRandNum } = require('../../utils/randomNumberGen');
const crypto = require('crypto');
const { Tag } = require('../../models/tag');
const { UPLOAD, UPLOAD_BASE } = require('../../utils/fileUpload');
const { CREATE_NEW_ACTIVITY } = require('../../utils/activityHandler');
const { ACTIVITIES } = require('../../constant/activities');

//validation
const validate = (req) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).required()
    })

    return schema.validate(req)
}

//post create user
const postCreateUser = async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    const exsistingUser = await User.findOne({email: req.body.email})
    if (exsistingUser) return res.status(400).send(MESSAGES.ALREADY_REGISTERED)
    const user = new User(_.pick(req.body, USER_FIELDS.SIGNUP))

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    user.url = crypto.randomBytes(3).toString('hex')
    await user.save()

    res.send(_.pick(user, USER_FIELDS.INFO))
}

//post update user
const postUpdateUserInfo = async (req, res) => {
    const user = await User.findOne({_id: req.user._id}).populate(USER_FIELDS.REFRENCES.map(field => ({ path: field})))
    if (!user) return res.status(400).send(MESSAGES.USER_NOT_FOUND)

    const updatedFields = _.pick(req.body, USER_FIELDS.UPDATABLE)
    for (const field in updatedFields) {
        user[field] = updatedFields[field]
    }

    await user.save()

    res.send(_.pick(user, USER_FIELDS.INFO))
}

//get current user
const getCurrentUser = async (req, res) => {
    const user = await User.findOne({_id: req.user._id}).populate(USER_FIELDS.REFRENCES.map(field => ({ path: field})))
    if (!user) return res.status(400).send(MESSAGES.USER_NOT_FOUND)

    res.send(_.pick(user, USER_FIELDS.INFO))
}

//add to users recent files
const addRecentFile = async (req, res) => {
    const user = await User.findOne({_id: req.user._id})
    if (!user) return res.status(400).send(MESSAGES.USER_NOT_FOUND)

    const file = await File.findOne({_id: req.body.File, isActive: true})
    if (!file) return res.status(400).send(MESSAGES.FILE_NOT_FOUND)

    const newRecentFiles = user.RecentFiles.filter(recent => {
        return !recent.equals(file._id)
    })
    newRecentFiles.push(file._id)

    user.RecentFiles = [...newRecentFiles].slice(-10)

    await user.save()

    await user.populate('RecentFiles')

    CREATE_NEW_ACTIVITY(
        user._id,
        req.body.Lab,
        ACTIVITIES.DOWNLOAD_PAPER.KEY,
        ACTIVITIES.DOWNLOAD_PAPER.TEXT,
    )

    res.send(user.RecentFiles.filter(file => {
        return file.isActive
    }))
}

//update profile picture
const uploadProfilePicture = async (req, res) => {
    const user = await User.findOne({_id: req.user._id})
    if (!user) return res.status(400).send(MESSAGES.USER_NOT_FOUND)

    const file = req.file
    if (!file) return res.status(400).json({ error: MESSAGES.NO_FILE });
    if (!ALLOWED_FORMATS.includes(file.mimetype)) return res.status(400).json({ error: MESSAGES.BAD_FORMAT });

    const fileName = file.originalname
    const fileFormat = fileName.split('.').pop()
    const fileAlias = crypto.randomBytes(6).toString('hex')

    const upload_res = await UPLOAD(file, fileAlias + '.' + fileFormat, 'profiles')
    if (!upload_res) return res.status(500).json({ error: MESSAGES.UPLOAD_FAILED });

    const url = UPLOAD_BASE + 'profiles/' + fileAlias + '.' + fileFormat

    user.profilePicture = url
    await user.save()

    res.send(_.pick(user, USER_FIELDS.INFO))
}

module.exports = {
    postCreateUser,
    postUpdateUserInfo,
    getCurrentUser,
    addRecentFile,
    uploadProfilePicture,
}