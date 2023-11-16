const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, isCoSupervisor } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    postCreatePath,
}
= require('./services');

const router = express.Router()

// Add new event
router.post('/', isCoSupervisor, postAddEvent)

module.exports = router