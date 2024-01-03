const auth = require('../../middleware/auth')
const express = require('express');
const {
    postCreateUser,
    postUpdateUserInfo,
    getCurrentUser,
    addRecentFile,
    uploadProfilePicture,
}
= require('./services');
const multer = require('multer');
var upload = multer({
    dest: 'public/uploads/',
    limits: { fileSize: 50 * 1024 * 1024 }
}).single('file')

const router = express.Router()

//create user(signup)
router.post('/', postCreateUser)

//add to recent files
router.post('/recent', auth, addRecentFile)

//update user info
router.post('/update', auth, postUpdateUserInfo)

//get current user
router.get('/me', auth, getCurrentUser)

//update profile picture
router.post('/update-profile-picture', auth, upload, uploadProfilePicture)

module.exports = router