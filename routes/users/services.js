const { MODELS } = require('../../constant/models');
const { User, validateUser, EmailAuthObject } = require('../../models/user');
const { MESSAGES } = require('./constants')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const config = require('config')
const nodemailer = require('nodemailer');
const { checkEmailFormat } = require('../../utils/emailRegexChecker');
const { generateRandNum } = require('../../utils/randomNumberGen');
const crypto = require('crypto');

// const transporter = nodemailer.createTransport({
//     service: config.get('email_service'),
//     auth: {
//         user: config.get('email_address'),
//         pass: config.get('email_password')
//     }
// })

//check phonenumber
const postCheckPhonenumber = async (req, res) => {
    if (!req.body.phonenumber) return res.status(400).send()
    let user = await User.findOne({ phonenumber: req.body.phonenumber })
    if (user) return res.status(400).send(MESSAGES.ALREADY_REGISTERED)

    res.send()
}

module.exports = {
    postCheckPhonenumber,
}