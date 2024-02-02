const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS, TYPES } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');

const activitySchema = new mongoose.Schema({
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

    key: {
        type: String,
        required: true,
    },

    text: {
        type: String,
        required: true,
    },

    data: {},

    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
})

const Activity = mongoose.model(MODELS.ACTIVITY, activitySchema)

exports.Activity = Activity