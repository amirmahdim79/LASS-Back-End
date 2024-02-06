const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, hasPermissions } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    getNotifications,
    readNotification,
}
= require('./services');
const labCheck = require('../../middleware/labCheck');

const router = express.Router()

// Get notifications
router.get('/', auth, getNotifications)

// Read Notification
router.post('/read', auth, readNotification)

module.exports = router