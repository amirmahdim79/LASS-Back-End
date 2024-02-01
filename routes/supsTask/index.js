const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, hasPermissions } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    getSupsTasks,
    getSupsTask,
    acceptMilestone,
    rejectMilestone,
}
= require('./services');

const router = express.Router()

// get sups tasks
router.get('/', isSupervisor, getSupsTasks)

// get a sups task
router.get('/task/:id', isSupervisor, getSupsTask)

// accept a milestone
router.post('/accept', isSupervisor, acceptMilestone)

// reject a milestone
router.post('/reject', isSupervisor, rejectMilestone)


module.exports = router