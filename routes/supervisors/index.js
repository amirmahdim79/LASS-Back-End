const auth = require('../../middleware/auth')
const express = require('express');
const {
    postCheckPhonenumber,
    postCreateSupervisor,
    addRecentFile,
}
= require('./services');
const multer = require('multer');

const router = express.Router()

//create new sups
router.post('/', postCreateSupervisor)

//add to recent files
router.post('/recent', auth, addRecentFile)

module.exports = router