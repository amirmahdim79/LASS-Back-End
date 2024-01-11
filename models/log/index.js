const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');

const logSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.USER
    },

    type: {
        type: String,
    },

    info: {
        type: String,
    },

    api: {
        ipAddress: {
            type: String,
        },
        method: {
            type: String,
        },
        url: {
            type: String,
        },
        elapsedTime: {
            type: Number,
        },
        userAgent: {
            type: String,
        },
        requestData: {
            type: Object,
        },
        responseData: {
            type: Object,
        },
        params: {
            type: Object,
        },
        query: {
            type: Object,
        },
        headers: {
            type: Object,
        },

    },

    error: {
        type: Object,
    },

    expireAt: { type: Date, default: () => Date.now() + 7 * 24 * 60 * 60 * 1000 }

}, {
    timestamps: true,
})

const Log = mongoose.model(MODELS.LOG, logSchema)

exports.Log = Log