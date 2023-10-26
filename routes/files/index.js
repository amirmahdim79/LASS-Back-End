const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    createNewFile,
    getFileInfo,
}
= require('./services');
const multer = require('multer');

const router = express.Router()

var upload = multer({
    dest: 'public/uploads/',
    limits: { fileSize: 50 * 1024 * 1024 }
}).single('file')

// Create new milestone for path
router.post('/', auth, upload, createNewFile)

// Create new milestone for path
router.get('/find/:id', auth, getFileInfo)

module.exports = router