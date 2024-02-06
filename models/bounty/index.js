const mongoose = require("mongoose")
const config = require('config')
const jwt = require('jsonwebtoken')
const GLOBALCONST = require('../../constant')
const { MODELS, SUBMODELS, TYPES } = require('../../constant/models')
const Joi = require('joi');
const crypto = require('crypto');
const { BOUNTY_TYPES } = require("./constatns")

const bountySchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.USER,
    },

    Lab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.LAB,
        required: true,
    },

    PotentialList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.USER,
    }],

    name: {
        type: String,
        required: true,
    },

    smarties: {
        type: Number,
        required: true,
    },

    desc: {
        type: String,
    },

    hasFile: {
        type: Boolean,
        default: false
    },

    File: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.FILE,
    },

    status: {
        type: String,
        enum: BOUNTY_TYPES,
        default: 'none',
        required: true,
    },

    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
})

const Bounty = mongoose.model(MODELS.BOUNTY, bountySchema)

exports.Bounty = Bounty