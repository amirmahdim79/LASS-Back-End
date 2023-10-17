const auth = require('../../middleware/auth')
const express = require('express');
const {
    postCreateUser,
    postUpdateUserInfo,
    getCurrentUser
}
= require('./services');
const multer = require('multer');

const router = express.Router()

//create user(signup)
router.post('/', postCreateUser)

//update user info
router.post('/update', auth, postUpdateUserInfo)

//get current user
router.get('/me', auth, getCurrentUser)

module.exports = router