const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, isCoSupervisor } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    postAddEvent,
    getLabEvents,
}
= require('./services');

const router = express.Router()

// Add new event
router.post('/', isCoSupervisor, postAddEvent)

// Add new event
router.get('/lab/:id', auth, getLabEvents)

module.exports = router