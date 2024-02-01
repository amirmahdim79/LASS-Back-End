const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, hasPermissions } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    getLabForums,
    getForums,
    sendMessage,
    getForum,
    createForum,
}
= require('./services');

const router = express.Router()

// Create new forum
router.post('/', hasPermissions(['forums']), createForum)

// Get lab forums
router.get('/:lab', auth, hasPermissions(['forums']), getLabForums)

// Get user forums
router.get('/user/:lab', auth, getForums)

// Get a forum
router.get('/info/:forum', auth, getForum)

// Send message to a forum
router.post('/message', auth, sendMessage)


module.exports = router