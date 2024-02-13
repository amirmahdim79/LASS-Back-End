const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, hasPermissions } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    postCreateLab,
    getLabs,
    getLabByField,
    getMyLab_sups,
    enrollStudent,
    getAllUsers,
    removeUser,
    getUserInfo,
    getPermissions,
    getLeaderboard,
    getLabUsersInfo,
    getAlumni,
}
= require('./services');
const labCheck = require('../../middleware/labCheck');

const router = express.Router()

// Create new Lab
router.post('/', isSupervisor, hasPermissions(['lab']), postCreateLab)

// get all labs
router.get('/', isSuperAdmin, getLabs)

// get my lab
router.get('/my', auth, getMyLab_sups)

// get lab students
router.get('/students', auth, labCheck, hasPermissions(['lab']), getAllUsers)

// get lab students
router.get('/alumni', auth, hasPermissions(['lab']), getAlumni)

// get lab students
router.get('/students/info', auth, hasPermissions(['lab']), getLabUsersInfo)

// get a lab student
router.get('/student', auth, labCheck, hasPermissions(['lab']), getUserInfo)

// get permission list
router.get('/permissions', auth, getPermissions)

// get leaderboard
router.get('/leaderboard', auth, labCheck, getLeaderboard)



// get one lab
router.get('/:id', isSuperAdmin, getLabByField)

// enroll new student
router.post('/enroll', auth, hasPermissions(['lab']), enrollStudent)

// remove a student
router.post('/remove-student', auth, hasPermissions(['lab']), removeUser)


module.exports = router