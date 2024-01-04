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
// router.post('/', isSupervisor, createGroup)

// Get lab forums
router.get('/:lab', isSupervisor, getGroups)

// Get user forums
router.get('/user/:lab', auth, getGroups)


module.exports = router