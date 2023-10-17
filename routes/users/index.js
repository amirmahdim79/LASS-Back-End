const auth = require('../../middleware/auth')
const express = require('express');
const {
    postCreateUser,
    postUpdateUserInfo
}
= require('./services');
const multer = require('multer');

const router = express.Router()

//check phone
router.post('/', postCreateUser)

//check phone
router.post('/update', auth, postUpdateUserInfo)

module.exports = router