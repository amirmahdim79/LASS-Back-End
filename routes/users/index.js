const auth = require('../../middleware/auth')
const express = require('express');
const {
    postCheckPhonenumber,
}
= require('./services');
const multer = require('multer');

const router = express.Router()

//check phone
router.post('/check-phone', postCheckPhonenumber)

module.exports = router