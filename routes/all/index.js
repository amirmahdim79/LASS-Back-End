const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, hasPermissions } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    sendInvite,
}
= require('./services');

const router = express.Router()

// Create new group
router.post('/email', sendInvite)

module.exports = router