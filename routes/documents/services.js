const { User } = require('../../models/user');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const crypto = require('crypto');
const { Group } = require('../../models/group');
const { GROUP_FIELDS } = require('../../models/group/constatns');
const { Lab } = require('../../models/lab');
const { MESSAGES } = require('./constants');
const { Activity } = require('../../models/activity');
const { ACTIVITY_MODEL_FIELDS } = require('../../models/activity/constatns');
const { MOMENT_JALALI, MOMENT } = require('../../utils/dateHandler');
const { CREATE_AND_SHARE } = require('../../utils/documentHandler');
const { Document } = require('../../models/document');
const { SupsTask } = require('../../models/supsTask');
const { LABS_FIELD } = require('../labs/constants');
const { DOCUMENT_FIELDS } = require('../../models/document/constatns');

//create new document
const createNewDocument = async (req, res) => {
    const lab = await Lab.findById(req.body.Lab).populate('Supervisor')
    if (!lab) return res.status(404).send(MESSAGES.LAB_NOT_FOUND)

    const emailList = []
    emailList.push(lab.Supervisor.email)

    const userIds = req.body.Users ?? []
    const users = await User.find({ _id: { $in: userIds } });

    users.forEach(user => {
        emailList.push(user.email);
    });

    const name = req.body.name ?? lab.name + '|' + MOMENT_JALALI(Date.now()).format('jYYYY/jM/jD') + '|' + MOMENT_JALALI().format('dddd')  + '|' + emailList.join('-')
    
    const documentId = await CREATE_AND_SHARE(name, emailList)
    
    const document = new Document({
        Supervisor: lab.Supervisor,
        Users: users,
        Lab: lab._id,
        documentId,
        name,
        desc: req.body.desc ?? '',
    })

    await document.save()

    res.send('Document added.')
}

//get documents
const getDocuments = async (req, res) => {
    const user = await User.findById(req.user._id)
    let documents = []

    if (user && user.permissions.includes('documents')) {
        documents = await Document.find({ Lab: req.query.lab }).populate(DOCUMENT_FIELDS.POPULATE).sort({ createdAt: -1 })
    } else {
        documents = await Document.find({
            $and: [
                { $or: [
                    { Supervisor: req.user._id },
                    { Users: { $in: [req.user._id] } }
                ]},
                { Lab: req.query.lab }
            ]
        }).populate(DOCUMENT_FIELDS.POPULATE).sort({ createdAt: -1 })
    }

    res.send(documents)
}

module.exports = {
    createNewDocument,
    getDocuments,
}