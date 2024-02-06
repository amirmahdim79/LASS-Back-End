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

//create group
const createNewBounty = async (req, res) => {
    const PotentialList = req.body.PotentialList
    if (!PotentialList || PotentialList?.length < 1) return res.status(400).send(MESSAGES.POTENTIAL_LIST)
    const bounty = new Bounty(_.pick(req.body, BOUNTY_FIELDS.CREATE))
    await bounty.save()

    res.send(_.pick(bounty, BOUNTY_FIELDS.INFO))
}

module.exports = {
    createNewBounty,
}