const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, hasPermissions } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    createNewBounty,
    getBounties,
}
= require('./services');
const labCheck = require('../../middleware/labCheck');

const router = express.Router()

// Create new bounty
router.post('/', auth, hasPermissions(['bounties']), createNewBounty)

// get bounty list
router.get('/', auth, labCheck, getBounties)

module.exports = router