const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS, TYPES } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');

const fileSchema = new mongoose.Schema({
    Tags: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: MODELS.TAG
        }],
        default: []
    },

    interval: {
        type: Number,
    },

    path: {
        type: String,
        required: true,
    },

    url: {
        type: String,
        required: true,
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

const File = mongoose.model(MODELS.FILE, fileSchema)

exports.File = File