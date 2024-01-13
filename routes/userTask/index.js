const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, hasPermissions } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    doUploadTask,
    doPaperTask,
    getUserTasks,
}
= require('./services');

const router = express.Router()

const multer = require('multer');

var upload = multer({
    dest: 'public/uploads/',
    limits: { fileSize: 50 * 1024 * 1024 }
}).single('file')

// do a upload task
router.post('/upload', auth, upload, doUploadTask)

// do a paper task
router.post('/paper', auth, doPaperTask)

// get user tasks
router.get('/', auth, getUserTasks)


module.exports = router