const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    postCreateLab,
    getLabs,
    getLabByField,
    getMyLab_sups,
    enrollStudent,
    getAllUsers,
}
= require('./services');

const router = express.Router()

// Create new Lab
router.post('/', isSupervisor, postCreateLab)

// get all labs
router.get('/', isSuperAdmin, getLabs)

// get my lab
router.get('/my', auth, getMyLab_sups)

// get lab students
router.get('/students', isSupervisor, getAllUsers)

// get one lab
router.get('/:id', isSuperAdmin, getLabByField)

// enroll new student
router.post('/enroll', isSupervisor, enrollStudent)



module.exports = router