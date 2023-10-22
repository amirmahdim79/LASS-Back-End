const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    postCreateTask,
}
= require('./services');

const router = express.Router()

// Create new milestone for path
router.post('/', isSupervisor, postCreateTask)

module.exports = router