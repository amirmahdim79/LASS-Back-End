const auth = require('../../middleware/auth')
const express = require('express');
const {
    postCreateUser,
    postUpdateUserInfo,
    getCurrentUser,
    addRecentFile,
}
= require('./services');
const multer = require('multer');

const router = express.Router()

//create user(signup)
router.post('/', postCreateUser)

//add to recent files
router.post('/recent', auth, addRecentFile)

//update user info
router.post('/update', auth, postUpdateUserInfo)

//get current user
router.get('/me', auth, getCurrentUser)

module.exports = router