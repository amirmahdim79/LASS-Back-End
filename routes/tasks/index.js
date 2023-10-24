const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    postCreateTask,
    completeTask,
    getTaskStatus,
}
= require('./services');

const router = express.Router()

// Create new milestone for path
router.post('/', isSupervisor, postCreateTask)

// Create new milestone for path
router.post('/complete', auth, completeTask)

// Create new milestone for path
router.get('/status', auth, getTaskStatus)

module.exports = router