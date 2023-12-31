const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    searchTags,
}
= require('./services');

const router = express.Router()

// Create new milestone for path
router.get('/search', auth, searchTags)

module.exports = router