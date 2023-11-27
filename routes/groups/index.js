const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, hasPermissions } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    createGroup,
    getGroups,
}
= require('./services');

const router = express.Router()

// Create new group
router.post('/', hasPermissions(['groups']), createGroup)

// Create new group
router.get('/:lab', auth, getGroups)

module.exports = router