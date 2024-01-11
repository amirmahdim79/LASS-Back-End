const auth = require('../../middleware/auth')
const express = require('express');
const {
    postCreateSupervisor,
    addRecentFile,
    uploadProfilePicture,
    givePermission,
}
= require('./services');
const multer = require('multer');
const { isSupervisor } = require('../../middleware/permissionCheck');
var upload = multer({
    dest: 'public/uploads/',
    limits: { fileSize: 50 * 1024 * 1024 }
}).single('file')

const router = express.Router()

//create new sups
router.post('/', postCreateSupervisor)

//add to recent files
router.post('/recent', isSupervisor, addRecentFile)

//update profile picture
router.post('/update-profile-picture', isSupervisor, upload, uploadProfilePicture)


//give permission
router.post('/permission', isSupervisor, givePermission)

module.exports = router