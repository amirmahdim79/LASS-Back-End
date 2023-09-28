const auth = require('../../middleware/auth')
const express = require('express');
const {
    postCheckPhonenumber,
    postCreateSupervisor,
}
= require('./services');
const multer = require('multer');

const router = express.Router()

//create new sups
router.post('/', postCreateSupervisor)

module.exports = router