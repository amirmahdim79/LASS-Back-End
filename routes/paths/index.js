const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    postCreatePath,
}
= require('./services');

const router = express.Router()

// Create new Lab
router.post('/', isSupervisor, postCreatePath)

module.exports = router