const auth = require('../../middleware/auth')
const express = require('express');
const {
    postCreateUser,
}
= require('./services');
const multer = require('multer');

const router = express.Router()

//check phone
router.post('/', postCreateUser)

module.exports = router