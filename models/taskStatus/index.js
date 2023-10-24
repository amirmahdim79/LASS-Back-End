const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');

const taskStatusSchema = new mongoose.Schema({
    Task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.TASK,
        required: true
    },

    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.USER,
        required: true
    },

    status: {
        type: Boolean,
        default: false,
    },

    data: {

    },

    isActive: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true,
})

const TaskStatus = mongoose.model(SUBMODELS.TASK_STATUS, taskStatusSchema)

exports.TaskStatus = TaskStatus