const { User } = require('../../models/user');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const crypto = require('crypto');
const { LABS_FIELD, MESSAGES } = require('./constants');
const { Lab } = require('../../models/lab');
const { Supervisor } = require('../../models/supervisor');

//post create cup for user(Admin)
const postCreateLab = async (req, res) => {
    const sups = await Supervisor.findOne({email: req.body.email})
    if (!sups) return res.status(400).send(MESSAGES.USER_NOT_FOUND)

    const lab = new Lab(_.pick(req.body, LABS_FIELD.CREATE))

    lab.Supervisor = sups._id
    lab.url = crypto.randomBytes(6).toString('hex')
    await lab.save()

    res.send(_.pick(lab, LABS_FIELD.CREATE_RES))
}

module.exports = {
    postCreateLab,
}