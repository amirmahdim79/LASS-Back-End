const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS, TYPES } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');
const { SUPS_TASK_TYPES } = require("./constatns")

const supsTaskSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        maxlength: 100,
        required: true,
    },

    desc: {
        type: String,
        minlength: 1,
        maxlength: 300
    },

    Supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.SUPERVISOR,
        required: true,
    },

    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.USER,
        required: true,
    },

    Lab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.LAB,
        required: true,
    },

    Milestone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.MILESTONE,
    },

    status: {
        type: Boolean,
        default: false,
    },

    doneDate: {
        type: Date,
    },

    type: {
        type: String,
        enum: SUPS_TASK_TYPES,
        required: true,
        default: 'milestone_check'
    },

    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
})

const SupsTask = mongoose.model(MODELS.SUPS_TASK, supsTaskSchema)

exports.SupsTask = SupsTask