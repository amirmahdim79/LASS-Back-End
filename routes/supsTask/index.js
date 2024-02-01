const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, hasPermissions } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    getSupsTasks,
    getSupsTask,
}
= require('./services');

const router = express.Router()

// get sups tasks
router.get('/', isSupervisor, getSupsTasks)

// get a sups task
router.get('/task/:id', isSupervisor, getSupsTask)


module.exports = router