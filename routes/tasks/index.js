const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    postCreateTask,
    completeTask,
    getTaskStatus,
    postDoPaperTask,
    getTask,
    postUploadTask,
}
= require('./services');

const router = express.Router()

const multer = require('multer');

var upload = multer({
    dest: 'public/uploads/',
    limits: { fileSize: 50 * 1024 * 1024 }
}).single('file')

// Create new milestone for path
router.post('/', isSupervisor, postCreateTask)

// TODO: just development api
router.post('/complete', auth, completeTask)

// TODO: just development api
router.get('/status', auth, getTaskStatus)

// Do paper task
router.post('/paper', auth, postDoPaperTask)

// Do upload task
router.post('/upload', auth, upload, postUploadTask)

// get a task
router.get('/', auth, getTask)

module.exports = router