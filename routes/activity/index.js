const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, hasPermissions } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    createNewActivity,
}
= require('./services');

const router = express.Router()

// Create new group
router.post('/', auth, createNewActivity)


module.exports = router