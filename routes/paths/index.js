const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    postCreateLab,
}
= require('./services');

const router = express.Router()

// Create new Lab
router.post('/', isSuperAdmin, postCreateLab)

module.exports = router