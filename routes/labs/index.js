const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    postCreateLab,
    getLabs,
    getLabByField,
    getMyLab_sups,
}
= require('./services');

const router = express.Router()

// Create new Lab
router.post('/', isSuperAdmin, postCreateLab)

// get all labs
router.get('/', isSuperAdmin, getLabs)

// get my lab
router.get('/my', isSupervisor, getMyLab_sups)

// get one lab
router.get('/:id', isSuperAdmin, getLabByField)



module.exports = router