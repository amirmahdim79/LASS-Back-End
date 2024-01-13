const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS, TYPES } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');

const userTaskSchema = new mongoose.Schema({
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

    Event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.EVENT,
    },

    status: {
        type: Boolean,
        default: false,
    },

    dueDate: {
        type: Date,
        required: true,
    },

    file: {
        type: String,
    },

    type: {
        //todo
    },

    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
})

const UserTask = mongoose.model(MODELS.USER_TASK, userTaskSchema)

exports.UserTask = UserTask