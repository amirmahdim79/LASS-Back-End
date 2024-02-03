const auth = require('../../middleware/auth')
const authCheck = require('../../middleware/authCheck');
const { isSuperAdmin, isSupervisor, hasPermissions } = require('../../middleware/permissionCheck');
const express = require('express');
const {
    createNewDocument,
    getDocuments,
}
= require('./services');
const labCheck = require('../../middleware/labCheck');

const router = express.Router()

// Create new document
router.post('/create', auth, hasPermissions(['documents']), createNewDocument)

// Create new document
router.get('/', auth, labCheck, getDocuments)


module.exports = router