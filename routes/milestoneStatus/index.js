const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    postCreateMilestone,
}
= require('./services');

const router = express.Router()

// Create new milestone for path
// router.post('/', isSupervisor, postCreateMilestone)

module.exports = router