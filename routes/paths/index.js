const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, hasPermissions } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    postCreatePath,
    postCreateFullPath,
}
= require('./services');

const router = express.Router()

// Create new Path
router.post('/', hasPermissions(['lab']), postCreatePath)

// Create new FULL Path
router.post('/', hasPermissions(['lab']), postCreateFullPath)

module.exports = router