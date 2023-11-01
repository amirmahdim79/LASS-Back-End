const bcrypt = require('bcrypt')
const _ = require('lodash')
const config = require('config')
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { TEMPLATES, REPLACER } = require('./constants');

const MAIL_MAN = () => {
    const BASE_EMAIL = config.get('email_address')

    const transporter = nodemailer.createTransport({
        service: config.get('email_service'),
        auth: {
            user: BASE_EMAIL,
            pass: config.get('email_password')
        }
    })

    const SEND = (TO, content = '', subject = '') => {
        const mailOptions = {
            from: BASE_EMAIL,
            to: TO,
            subject: subject,
            html: `${content}`
        };

        transporter.sendMail(mailOptions);
    }

    //templates = [LAB_WELCOME, ]
    const SEND_TEMPLATE = (TO, template, keys) => {
        const mailOptions = {
            from: BASE_EMAIL,
            to: TO,
            subject: TEMPLATES[template].SUBJECT,
            html: REPLACER(TEMPLATES[template].CONTENT, keys)
        };

        transporter.sendMail(mailOptions);
    }

    return {
        SEND,
        SEND_TEMPLATE,
    }
}

module.exports = MAIL_MAN