const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS, TYPES } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');
const { TASK_TYPES, ACTIVITY_TYPES } = require("./constants")

const taskSchema = new mongoose.Schema({
    Milestone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.MILESTONE
    },

    type: {
        type: String,
        enum: TASK_TYPES,
        required: true,
    },

    interval: {
        type: Number,
    },

    activity: {
        type: String,
        enum: ACTIVITY_TYPES,
        required: true,
    },

    status: {
        type: Boolean,
        default: false,
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

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true,
})

const Task = mongoose.model(MODELS.TASK, taskSchema)

exports.Task = Task