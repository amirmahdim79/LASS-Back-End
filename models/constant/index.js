const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS, TYPES } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');

const constantSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
    },

    string: {
        type: String,
    },

    boolean: {
        type: Boolean,
    },

    array: {
        type: Array,
    },

    object: {
        type: Object,
    },

    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
})

const Constant = mongoose.model(MODELS.CONSTANT, constantSchema)

exports.Constant = Constant