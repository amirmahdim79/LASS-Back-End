const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS, TYPES } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');

const notificationSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.USER,
        required: true,
    },

    text: {
        type: String,
        required: true,
    },

    url: {
        type: String,
    },

    read: {
        type: Boolean,
        default: false,
    },

    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
})

const Notification = mongoose.model(MODELS.NOTIFICATION, notificationSchema)

exports.Notification = Notification