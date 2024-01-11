const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS, TYPES } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');
const { ACTIVITY_TYPES } = require("../task/constants")

const reportSchema = new mongoose.Schema({
    Lab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.LAB,
        required: true,
    },

    Task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.TASK,
        required: true,
    },

    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.USER,
        required: true,
    },

    activity: {
        type: String,
        enum: ACTIVITY_TYPES,
        required: true,
    },

    Files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.FILE,
    }],

    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
})

const Report = mongoose.model(MODELS.REPORT, reportSchema)

exports.Report = Report