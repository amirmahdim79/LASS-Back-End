const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, hasPermissions } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    createNewActivity,
    getUserActivities,
    getMyActivity,
}
= require('./services');

const router = express.Router()

// Create new group
router.post('/', auth, createNewActivity)

// get a user activty
router.get('/user-activity', hasPermissions(['lab']), getUserActivities)

// get my activity
router.get('/my', auth, getMyActivity)


module.exports = router