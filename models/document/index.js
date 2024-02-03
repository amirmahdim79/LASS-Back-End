const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS, TYPES } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');

const documentSchema = new mongoose.Schema({
    Supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.SUPERVISOR,
        required: true,
    },

    Users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.USER,
        required: true,
    }],

    Lab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.LAB,
        required: true,
    },

    documentId: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    desc: {
        type: String,
    },

    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
})

const Document = mongoose.model(MODELS.DOCUMENT, documentSchema)

exports.Document = Document