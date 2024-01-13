const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, hasPermissions } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    getLabForums,
}
= require('./services');

const router = express.Router()

// Get lab forums
router.get('/:lab', hasPermissions(['forums']), getLabForums)


module.exports = router