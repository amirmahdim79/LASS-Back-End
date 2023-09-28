const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isAdmin } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    postCreateCupForUser,
}
= require('./services');

const router = express.Router()

//
router.post('/', postCreateCupForUser)

module.exports = router