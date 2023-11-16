const { User } = require('../../models/user');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const crypto = require('crypto');
const { PATH_FIELDS, MESSAGES } = require('./constants');
const { Lab } = require('../../models/lab');
const { Supervisor } = require('../../models/supervisor');
const { Path } = require('../../models/path');
const { Milestone } = require('../../models/milestone');

//post create path for lab(Sups)
const postAddEvent = async (req, res) => {
    const lab = await Lab.findOne({
        Supervisor: req.user._id
    })
    if (!lab) return res.status(400).send(MESSAGES.LAB_NOT_FOUND)

    const path = new Path(_.pick(req.body, PATH_FIELDS.CREATE))
    path.Lab = lab

    path.url = crypto.randomBytes(3).toString('hex')

    await path.save()

    lab.Paths.push(path._id)

    lab.save()

    res.send(_.pick(path, PATH_FIELDS.CREATE_RES))
}

module.exports = {
    postAddEvent,
}