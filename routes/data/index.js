const express = require('express');
const {
    collectData,
}
= require('./services');
const authCheck = require('../../middleware/authCheck');

const router = express.Router()

//collect data
router.post('/:action', authCheck, collectData)

module.exports = router