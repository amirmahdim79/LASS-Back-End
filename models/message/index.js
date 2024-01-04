const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS, TYPES } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');

const messageSchema = new mongoose.Schema({
    Sender: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },

    senderType: {
        type: String,
        required: true,
        enum: [MODELS.USER, MODELS.SUPERVISOR],
    },

    Forum: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.FORUM,
        required: true,
    },

    text: {
        type: String,
        minlength: 1,
        maxlength: 1000,
        required: true,
    },

    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
})

const Message = mongoose.model(SUBMODELS.MESSAGE, messageSchema)

exports.Message = Message