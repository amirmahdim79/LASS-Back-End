const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, hasPermissions } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    createGroup,
    getGroups,
    deleteGroup,
    updateGroup,
}
= require('./services');

const router = express.Router()

// Create new group
router.post('/', hasPermissions(['groups']), createGroup)

// Delete a group
router.post('/delete', hasPermissions(['groups']), deleteGroup)

// Update a group
router.post('/update', hasPermissions(['groups']), updateGroup)

// Get lab groups
router.get('/:lab', auth, getGroups)


module.exports = router