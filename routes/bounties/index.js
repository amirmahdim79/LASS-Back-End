const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, hasPermissions } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    createNewBounty,
}
= require('./services');
const labCheck = require('../../middleware/labCheck');

const router = express.Router()

// Create new bounty
router.post('/', auth, hasPermissions(['bounties']), createNewBounty)

module.exports = router