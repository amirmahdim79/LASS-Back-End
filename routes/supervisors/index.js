const auth = require('../../middleware/auth')
const express = require('express');
const {
    postCreateSupervisor,
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

//create new sups
router.post('/', postCreateSupervisor)

//add to recent files
router.post('/recent', auth, addRecentFile)

//update profile picture
router.post('/update-profile-picture', auth, upload, uploadProfilePicture)

module.exports = router