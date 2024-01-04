const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, hasPermissions } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    getLabForums,
    getForums,
}
= require('./services');

const router = express.Router()

// Create new group
// router.post('/', isSupervisor, createGroup)

// Get lab forums
router.get('/:lab', hasPermissions(['forums']), getLabForums)

// Get user forums
router.get('/user/:lab', auth, getForums)


module.exports = router