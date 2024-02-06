const { User } = require('../../models/user');
const bcrypt = require('bcrypt')
const _ = require('lodash');
const crypto = require('crypto');
const { Group } = require('../../models/group');
const { GROUP_FIELDS } = require('../../models/group/constatns');
const { Lab } = require('../../models/lab');
const { MESSAGES } = require('./constants');
const { Activity } = require('../../models/activity');
const { Bounty } = require('../../models/bounty');
const { BOUNTY_FIELDS } = require('../../models/bounty/constatns');

//create bounty
const createNewBounty = async (req, res) => {
    const PotentialList = req.body.PotentialList
    if (!PotentialList || PotentialList?.length < 1) return res.status(400).send(MESSAGES.POTENTIAL_LIST)
    const bounty = new Bounty(_.pick(req.body, BOUNTY_FIELDS.CREATE))
    await bounty.save()

    res.send(_.pick(bounty, BOUNTY_FIELDS.INFO))
}

//get all bounties
const getBounties = async (req, res) => {
    const status = req.query.status

    const baseQuery = {
        Lab: req.query.lab,
        isActive: true,
        ...(status && { status })
    };

    const bounties = await Bounty.find(baseQuery).populate(BOUNTY_FIELDS.POPULATE)

    res.send(bounties)
}

//get one bounty
const getBounty = async (req, res) => {
    const bounty = await Bounty.findOne({
        Lab: req.query.lab,
        _id: req.query.id
    }).populate(BOUNTY_FIELDS.POPULATE)

    res.send(bounty)
}

//delete one bounty
const deleteBounty = async (req, res) => {
    const bounty = await Bounty.findOne({
        Lab: req.query.lab,
        _id: req.query.id
    }).populate(BOUNTY_FIELDS.POPULATE)

    bounty.isActive = false

    await bounty.save()

    res.send('Deleted successfuly')
}

module.exports = {
    createNewBounty,
    getBounties,
    getBounty,
    deleteBounty,
}