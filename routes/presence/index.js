const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, hasPermissions } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    updatePresence,
}
= require('./services');
const labCheck = require('../../middleware/labCheck');

const router = express.Router()

// update presence form
router.post('/', labCheck, hasPermissions(['forums']), updatePresence)


module.exports = router