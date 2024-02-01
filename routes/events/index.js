const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, isCoSupervisor, hasPermissions } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    postAddEvent,
    getLabEvents,
    deleteEvent,
}
= require('./services');

const router = express.Router()

// Add new event
router.post('/', hasPermissions(['events']), postAddEvent)

// Delete event
router.post('/delete', hasPermissions(['events']), deleteEvent)

// get lab events
router.get('/lab/:id', auth, getLabEvents)

module.exports = router