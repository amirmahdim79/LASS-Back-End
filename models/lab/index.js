const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');

const labSchema = new mongoose.Schema({
    Supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.SUPERVISOR
    },

    Students: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: MODELS.USER
        }],
        default: []
    },

    Paths: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: MODELS.PATH
        }],
        default: []
    },

    name: {
        type: String,
        minlength: 1,
        maxlength: 100
    },

    desc: {
        type: String,
        minlength: 1,
        maxlength: 300
    },

    logo: {
        type: String,
    },

    url: {
        type: String,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true,
})

const Lab = mongoose.model(MODELS.LAB, labSchema)

exports.Lab = Lab