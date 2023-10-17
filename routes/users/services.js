const { MODELS } = require('../../constant/models');
const { User, validateUser, EmailAuthObject } = require('../../models/user');
const { MESSAGES, USER_FIELDS } = require('./constants')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const config = require('config')
const nodemailer = require('nodemailer');
const { checkEmailFormat } = require('../../utils/emailRegexChecker');
const { generateRandNum } = require('../../utils/randomNumberGen');
const crypto = require('crypto');
const { Tag } = require('../../models/tag');

// const transporter = nodemailer.createTransport({
//     service: config.get('email_service'),
//     auth: {
//         user: config.get('email_address'),
//         pass: config.get('email_password')
//     }
// })

//post create user
const postCreateUser = async (req, res) => {
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

module.exports = {
    postCreateUser,
    postUpdateUserInfo,
    getCurrentUser,
}